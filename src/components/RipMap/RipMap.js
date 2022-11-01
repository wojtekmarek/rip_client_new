import React,{Component} from "react";
import"./RipMap.css"
import initialState from "../../reduser/store"

class RipMap extends Component{

   state={
        visiblelist: []
    }
    componentDidMount = () => {
      
        console.log(initialState.backendadress);
        fetch(initialState.backendadress+'/gravequarters/check')
        .then(response => response.json())
        .then(json =>{
            console.log(json);
            this.setState({visiblelist: json})
        })
        /*.then(response => {
            console.log(typeof response.body);
            console.log(response);
            })
      
      /*  .then(json =>{
            console.log(typeof json);
            console.log(json);
        })
      
*/


    }

    clikgrave(id) {
        
        console.log('You clicked grave' +id);
      }

    
    render(){
        const{visiblelist}=this.state;

       
    return(
    <div>
        
        <div className="Container">
  
                <div className="Map">
                <div className="A">
                    <div className={"a1 "+ (this.state.visiblelist[0] ? 'isburial' : 'isnotburial')} id="1" onClick={this.clikgrave(this.id)}>
                        <h5>1</h5>
                    </div>
                    <div className="a2" id="2">
                        <h5>2</h5>
                    </div>
                    <div className="a3" id="3">
                        <h5>3</h5>
                    </div>
                    <div className="a4" id="4">
                        <h5>4</h5>
                    </div>
                    <div className="a5" id="5">
                        <h5>5</h5>
                    </div>
                    <div className="a6" id="6">
                        <h5>6</h5>
                    </div>
                    <div className="a7" id="7">
                        <h5>7</h5>
                    </div>
                    <div className="a8" id="8">
                        <h5>8</h5>
                    </div>
                    <div className="a9" id="9">
                        <h5>9</h5>
                    </div>
                    <div className="a10" id="10">
                        <h5>10</h5>
                    </div>
                    <div className="a11" id="11">
                        <h5>11</h5>
                    </div>
                    <div className="a12" id="12">
                        <h5>12</h5>
                    </div>
                
                </div>
                <div className="B">
                    <div className={"a1 "+ (this.state.visiblelist[0] ? 'isburial' : 'isnotburial')} id="13">
                        <h5>13</h5>
                    </div>
                    <div className="b14" id="14">
                        <h5>14</h5>
                    </div>
                    <div className="b15" id="15">
                        <h5>15</h5>
                    </div>
                    <div className="b16" id="16">
                        <h5>16</h5>
                    </div>
                    <div className="b17" id="17">
                        <h5>17</h5>
                    </div>
                    <div className="b18" id="18">
                        <h5>18</h5>
                    </div>
                    <div className="b19" id="19">
                        <h5>19</h5>
                    </div>
                    <div className="b20" id="b20">
                        <h5>20</h5>
                    </div>
                    <div className="b21" id="b21">
                        <h5>21</h5>
                    </div>
                    <div className="b22" id="22">
                        <h5>22</h5>
                    </div>
                    <div className="b23" id="23">
                        <h5>23</h5>
                    </div>
                    <div className="b24" id="24">
                        <h5>24</h5>
                    </div>
                        
                </div>
                <div className="C">
                    <div className="c25" id="c25">
                        <h5>25</h5>
                    </div>
                    <div className="c26" id="26">
                        <h5>26</h5>
                    </div>
                    <div className="c27" id="27">
                        <h5>27</h5>
                    </div>
                    <div className="c28" id="28">
                        <h5>28</h5>
                    </div>
                    <div className="c29" id="29">
                        <h5>29</h5>
                    </div>
                    <div className="c30" id="30">
                        <h5>30</h5>
                    </div>
                    <div className="c31" id="31">
                        <h5>31</h5>
                    </div>
                    <div className="c32" id="32">
                        <h5>32</h5>
                    </div>
                    <div className="c33" id="33">
                        <h5>33</h5>
                    </div>
                    <div className="c34" id="34">
                        <h5>34</h5>
                    </div>
                    <div className="c35" id="35">
                        <h5>35</h5>
                    </div>
                    <div className="c36" id="36">
                        <h5>36</h5>
                    </div>
                        
                </div>
                <div className="D">
                     <div className="d37" id="37">
                        <h5>37</h5>
                    </div> 
                    <div className="d38" id="38">
                        <h5>38</h5>
                    </div> 
                    <div className="d39" id="39">
                        <h5>39</h5>
                    </div> 
                    <div className="d40" id="40">
                        <h5>40</h5>
                    </div> 
                    <div className="d41" id="41">
                        <h5>41</h5>
                    </div> 
                    <div className="d42" id="42">
                        <h5>42</h5>
                    </div> 
                    <div className="d43" id="43">
                        <h5>43</h5>
                    </div> 
                    <div className="d44" id="44">
                        <h5>44</h5>
                    </div> 
                    <div className="d45" id="45">
                        <h5>45</h5>
                    </div> 
                    <div className="d46" id="46">
                        <h5>46</h5>
                    </div>
                    <div className="d47" id="47">
                        <h5>47</h5>
                    </div>
                    <div className="d48" id="48">
                        <h5>48</h5>
                    </div>
                    <div className="d49" id="49">
                        <h5>49</h5>
                    </div>
                </div>  
                <div className="E">
                    <div className="e50" id="50">
                        <h5>50</h5>
                    </div> 
                    <div className="e51" id="51">
                        <h5>51</h5>
                    </div> 
                    <div className="e52" id="52">
                        <h5>52</h5>
                    </div> 
                    <div className="e53" id="53">
                        <h5>53</h5>
                    </div> 
                    <div className="e54" id="54">
                        <h5>54</h5>
                    </div> 
                    <div className="e55" id="55">
                        <h5>55</h5>
                    </div> 
                    <div className="e56" id="56">
                        <h5>56</h5>
                    </div> 
                    <div className="e57" id="57">
                        <h5>57</h5>
                    </div> 
                    <div className="e58" id="58">
                        <h5>58</h5>
                    </div> 
                    <div className="e59" id="59">
                        <h5>59</h5>
                    </div>
                    <div className="e60" id="60">
                        <h5>60</h5>
                    </div>
                    <div className="e61" id="61">
                        <h5>61</h5>
                    </div>
                    <div className="e62" id="62">
                        <h5>62</h5>
                    </div>
                        
                </div>
                <div className="F">
                    <div className="f63" id="63">
                        <h5>63</h5>
                    </div> 
                    <div className="f64" id="64">
                        <h5>64</h5>
                    </div> 
                    <div className="f65" id="65">
                        <h5>65</h5>
                    </div> 
                    <div className="f66" id="66">
                        <h5>66</h5>
                    </div> 
                    <div className="f67" id="67">
                        <h5>67</h5>
                    </div> 
                    <div className="f68" id="68">
                        <h5>68</h5>
                    </div> 
                    <div className="f69" id="69">
                        <h5>69</h5>
                    </div> 
                    <div className="f70" id="70">
                        <h5>70</h5>
                    </div> 
                    <div className="f71" id="71">
                        <h5>71</h5>
                    </div> 
                    <div className="f72" id="72">
                        <h5>72</h5>
                    </div>
                    <div className="f73" id="73">
                        <h5>73</h5>
                    </div>
                    <div className="f74" id="74">
                        <h5>74</h5>
                    </div>
                    <div className="f75" id="75">
                        <h5>75</h5>
                    </div>
                        
                </div>
                <div className="G">
                    <div className="g76" id="76">
                        <h5>76</h5>
                    </div> 
                    <div className="g77" id="77">
                        <h5>77</h5>
                    </div> 
                    <div className="g78" id="78">
                        <h5>78</h5>
                    </div> 
                    <div className="g79" id="79">
                        <h5>79</h5>
                    </div> 
                    <div className="g80" id="80">
                        <h5>80</h5>
                    </div> 
                    <div className="g81" id="81">
                        <h5>81</h5>
                    </div> 
                    <div className="g82" id="82">
                        <h5>82</h5>
                    </div> 
                    <div className="g83" id="83">
                        <h5>83</h5>
                    </div> 
                    <div className="g84" id="84">
                        <h5>84</h5>
                    </div> 
                    <div className="g85" id="85">
                        <h5>85</h5>
                    </div>
                    <div className="g86" id="86">
                        <h5>86</h5>
                    </div>
                    <div className="g87" id="87">
                        <h5>87</h5>
                    </div>
                    <div className="g88" id="88">
                        <h5>88</h5>
                    </div>
                        
                </div>
                <div className="H">
                    <div className="h89" id="89">
                        <h5>89</h5>
                    </div>
                    <div className="h90" id="90">
                        <h5>90</h5>
                    </div>
                    <div className="h91" id="91">
                        <h5>91</h5>
                    </div>
                    <div className="h92" id="92">
                        <h5>92</h5>
                    </div>
                    <div className="h93" id="93">
                        <h5>93</h5>
                    </div>
                    <div className="h94" id="94">
                        <h5>94</h5>
                    </div>
                    <div className="h95" id="95">
                        <h5>95</h5>
                    </div>
                    <div className="h96" id="96">
                        <h5>96</h5>
                    </div>
                    <div className="h97" id="97">
                        <h5>97</h5>
                    </div>
                    <div className="h98" id="98">
                        <h5>98</h5>
                    </div>   
                    <div className="h99" id="99">
                        <h5>99</h5>
                    </div>
                    <div className="h100" id="100">
                        <h5>100</h5>
                    </div>
                    <div className="h101" id="101">
                        <h5>101</h5>
                    </div>
                    <div className="h102" id="102">
                        <h5>102</h5>
                    </div>
                    <div className="h103" id="103">
                        <h5>102</h5>
                    </div>                              
                </div>
                <div className="I">
                    <div className="i104" id="104">
                        <h5>104</h5>
                    </div>
                    <div className="i105" id="105">
                        <h5>105</h5>
                    </div>
                    <div className="i106" id="106">
                        <h5>106</h5>
                    </div>
                    <div className="i107" id="107">
                        <h5>107</h5>
                    </div>
                    <div className="i108" id="108">
                        <h5>108</h5>
                    </div>
                    <div className="i109" id="109">
                        <h5>109</h5>
                    </div>
                    <div className="i110" id="110">
                        <h5>110</h5>
                    </div>
                    <div className="i111" id="111">
                        <h5>111</h5>
                    </div>
                    <div className="i112" id="112">
                        <h5>112</h5>
                    </div>
                    <div className="i113" id="113">
                        <h5>113</h5>
                    </div>   
                    <div className="i114" id="114">
                        <h5>114</h5>
                    </div>
                    <div className="i115" id="115">
                        <h5>115</h5>
                    </div>
                    <div className="i116" id="116">
                        <h5>116</h5>
                    </div>
                    <div className="i117" id="117">
                        <h5>117</h5>
                    </div>
                    <div className="i118" id="118">
                        <h5>118</h5>
                    </div>   
                        
                </div>
                <div className="J">
                        
                </div>
                <div className="K">
                        
                </div>
                <div className="L">
                        
                </div>

                </div>
                
                <div className="Boczek">
                <div className="Find">
                    <div className="RipFinder">
                        <label>Wyszukaj</label>
                        <input className="RipFinder"/>
                    </div>
                </div>
                <div className="Info">
                   Umarł i nie zyje

                </div>
                
                </div>
        </div>
              
    </div>
    )
    }
}
export default RipMap