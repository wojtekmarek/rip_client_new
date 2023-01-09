import '@testing-library/jest-dom';

import axios from 'axios';

import {select} from "react-select-event";
import {render, fireEvent, waitFor} from '@testing-library/react';
import {BrowserRouter} from "react-router-dom";

import Intentions from "./Intentions";

const mockStore = {backendadress: 'http://localhost:3001'};

jest.mock('axios', () => jest.fn());

beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
        json: jest.fn().mockResolvedValue([{
            _id: 'a635ee01-cc17-486e-a7bf-c0f66ced388e',
            Date_Of_even: '2023-01-09T10:30:00Z'
        }, {
            _id: 'a635ee01-cc17-486e-a7bf-c0f66ced388e',
            Date_Of_even: '2023-01-08T11:00:00Z'
        }])
    })
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Intentions', () => {
    it('renders', async () => {
        const {getByText, getByLabelText} = render(<Intentions store={mockStore}/>, {wrapper: BrowserRouter});

        // sprawdź czy formularz jest renderowany poprawnie
        expect(getByText('Zgłoś Swoją intecję mszalną')).toBeInTheDocument();
        expect(getByLabelText('Proponowany termin odprawienia Mszy')).toBeInTheDocument();
        expect(getByLabelText('Twoja intencja')).toBeInTheDocument();
        expect(getByLabelText('Zadeklaruj Ofiarę')).toBeInTheDocument();

    });

    it('allows user to select mass and submit intention', async () => {
        const {getByText, getByLabelText} = render(<Intentions store={mockStore}/>, {wrapper: BrowserRouter});

        axios.mockResolvedValueOnce({
            status: 200,
            data: {
                Payment_id: '4f0bce63-0ca8-484d-a103-b017ded05a11',
                Intention: {}
            }
        });

        // wybierz msze z menu rozwijanego
        await select(getByLabelText('Proponowany termin odprawienia Mszy'), 'Msza z dnia 09-01-2023 godzina 10:30');

        // wypełnij pola intencji i ofiary
        fireEvent.change(getByLabelText('Twoja intencja'), {target: {value: 'Intention for a loved one'}});
        fireEvent.change(getByLabelText('Zadeklaruj Ofiarę'), {target: {value: '100'}});

        // zatwierdź fromularz
        fireEvent.click(getByText('Zgłoś swoją intencję i dokonaj ofiary'));

        // poczekaj na zakończenie składania formularza
        await waitFor(() => {
            expect(axios).toHaveBeenCalledTimes(1)
        });
    });
});
