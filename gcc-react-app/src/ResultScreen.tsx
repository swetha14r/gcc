import {useLocation} from 'react-router-dom';

const ResultScreen = ()=>{
    const location = useLocation();
    const { result, input } = location.state || { result: {
        buildingLicenseFee: 0,
      demolitionFee: 0,
      roadCutCharges: 0,
      securityDeposit: 0,
      tentativeImprCharges :0,
      cmdaDevCharges:0,
      iaCharges:0,
      regCharge: 0,
        wwf: 0,
        midc: 0,
    }, 
    
        input: {zoning: 'Continuous',
    landUsage: '',
    typeOfLayout: '',
    plotExtent: 0,
    totalLand: 0,
    whetherReg: false,
    proposedType: '',
    roadWidth: 0,
    totalFSI: 0,
    roadType: '',
    totalBuiltUp: 0,
    proposedPlot: 0,
    compoundWall: 0,
    wellOTHSump: 0,
    existingTiled: 0,
    existingOther: 0,
    existingFirst: 0,
    whetherTent: false,
    whetherReg244: false,
    wef: false,}};

    return (
        <>
        <h1>Result</h1>
        <p>Land Usage: {input.proposedType}</p>
        <p>After 10.11.2023: {input.wef == true? 'true' : 'false'}</p>
        <p>Total Built Up Area: {input.totalBuiltUp}</p>
        <p>Well/OHT/Sump & Septic Tank Area: {input.wellOTHSump} </p>
        <p>Compound wall: {input.compoundWall}</p>
        <p>Building License Fee: Rs.{result.buildingLicenseFee}</p>
        <p>Demolition Fee: Rs.{result.demolitionFee}</p>
        <p>Road Cut Charges: Rs.{result.roadCutCharges}</p>
        <p>Plan Charges: Rs.1050</p>
        <p>Regularisation Charges: Rs.100/sq m (under section 244A)</p>
        <p>Security Deposit: Rs.{result.securityDeposit}</p>
        <p>Tentative Improvement Charge: Rs.{result.tentativeImprCharges}</p>
        <p>Display Board SD: Rs.1500</p>
        <p>CMDA Development Charges: Rs.{result.cmdaDevCharges}</p>
        <p>IA Charges: Rs.{result.iaCharges}</p>
        <p>Reg Charges: Rs. {result.regCharge}</p>
        <p>WWF: Rs. {result.wwf}</p>
        <p>MIDC: Rs. {result.midc}</p>
        </>
    );
}

export default ResultScreen;