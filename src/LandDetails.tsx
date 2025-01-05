import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './index.css';
import  { ChangeEvent, FormEvent, useState } from 'react';
import {useNavigate} from 'react-router-dom';

interface FormData{
    zoning: string;
    landUsage: string;
    typeOfLayout: string;
    plotExtent: number;
    totalLand: number;
    whetherReg: boolean;
    proposedType: string;
    roadWidth: number;
    totalFSI: number;
    roadType: string;
    totalBuiltUp: number;
    proposedPlot: number;
    compoundWall: number;
    wellOTHSump: number;
    existingTiled: number;
    existingOther: number;
    existingFirst: number;
    whetherTent: boolean;
    whetherReg244: boolean;
    wef: boolean;
    buildingHeight: number;
    plinth: number;
}

interface ResultCalc{
  buildingLicenseFee: number;
  demolitionFee: number;
  roadCutCharges: number;
  securityDeposit: number;
  tentativeImprCharges: number;
  cmdaDevCharges: number;
  iaCharges: number;
  regCharge: number;
  wwf: number;
  midc: number;
}

const LandDetails = () =>{
  
    const [formData, setFormData] = useState<FormData>({
        zoning: 'Continuous',
        landUsage: 'Commercial',
        typeOfLayout: '',
        plotExtent: 0,
        totalLand: 0,
        whetherReg: false,
        proposedType: 'Commercial',
        roadWidth: 0,
        totalFSI: 0,
        roadType: 'rt1',
        totalBuiltUp: 0,
        proposedPlot: 0,
        compoundWall: 0,
        wellOTHSump: 0,
        existingTiled: 0,
        existingOther: 0,
        existingFirst: 0,
        whetherTent: false,
        whetherReg244: false,
        wef: false,
        buildingHeight: 0,
        plinth: 0,

    });

    const [result, setResult] = useState<ResultCalc>({
      buildingLicenseFee: 0,
      demolitionFee: 0,
      roadCutCharges:0,
      securityDeposit:0,
      tentativeImprCharges:0,
      cmdaDevCharges:0,
      iaCharges:0,
      regCharge:0,
      wwf: 0,
      midc:0
    });

    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      
      // e.preventDefault();

        const { name, value, type, checked } = e.target as HTMLInputElement;
        console.log(name, value)
        const newValue = value === 'true' ? true : value === 'false' ? false : value;
        setFormData({
          ...formData,
          [name]: type === 'checkbox' ? checked.toString() : newValue,
        });
      };

    const handleChangeNumber = (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const { name, value } = e.target;
      const numberValue = value === '' ? 0 : parseFloat(value); // Treat empty as 0
      setFormData((prev) => ({
          ...prev,
          [name]: numberValue,
      }));
    };

    const handleStringChange = (e: ChangeEvent<HTMLSelectElement>) =>{
      e.preventDefault();
      
        const { name, value } = e.target as HTMLSelectElement;
        console.log(name,value)
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
          }));
    }
    

      const handleCalcBuildingLicenseFee = (totalBuiltUp: number, wellOTHSump: number, compoundWall:number, wef: boolean, propType: string)=>{
        let rate = 1, feeValue=0, db=1;
        if(wef){
            db=2;
        }

        if(propType==='Residential'){
            if(totalBuiltUp >=0){
                rate = 9*db;
                feeValue += rate*totalBuiltUp;
            }
            if(totalBuiltUp>=41){
                rate = 15.5*db;
                feeValue += rate*(totalBuiltUp - 40);
            }
            if(totalBuiltUp>=101){
                rate = 41*db;
                feeValue += rate*(totalBuiltUp - 100);
            }
            if(totalBuiltUp>400){
                rate = 105*db;
                feeValue += rate*(totalBuiltUp - 400);
            }
            if(wellOTHSump>0){
                feeValue += 115*db*wellOTHSump;
            }
            if(compoundWall>0){
                feeValue += 3.5*db*compoundWall;
            }
            return feeValue;
        }else{
            if(totalBuiltUp >=0){
                rate = 10.5*db;
                feeValue += rate*totalBuiltUp;
            }
            if(totalBuiltUp>=41){
                rate = 18.5*db;
                feeValue += rate*(totalBuiltUp - 40);
            }
            if(totalBuiltUp>=101){
                rate = 46*db;
                feeValue += rate*(totalBuiltUp - 100);
            }
            if(totalBuiltUp>400){
                rate = 115*db;
                feeValue += rate*(totalBuiltUp - 400);
            }
            if(wellOTHSump>0){
                feeValue += 115*db*wellOTHSump;
            }
            if(compoundWall>0){
                feeValue += 3.5*db*compoundWall;
            }
            return feeValue;
        }

        
      }

      const handleDemolitionFee = (groundFloor: number, groundFloorOther: number, firstFloor: number, wef: boolean) =>{
        let feeValue=0, db=1;
        if(wef){
            db=2;
        }
        feeValue = groundFloor*110*db + groundFloorOther*90*db + firstFloor*70*db;
        return feeValue
      }

      const handleRoadCutCharges = (wef: boolean, roadType: string, halfRoadWidth: number) =>{
        let feeValue=0
        console.log(roadType)
        if(wef){//after
          if(roadType === 'rt3'){
            feeValue = halfRoadWidth * 5515;
          }else if(roadType === 'rt1'){
            feeValue = halfRoadWidth * 4525;
          }else if(roadType === 'rt2'){
            feeValue = halfRoadWidth * 4665;
          }
        }else{
          if(roadType === 'rt3'){
            feeValue = halfRoadWidth * 5405;
          }else if(roadType === 'rt1'){
            feeValue = halfRoadWidth * 4445;
          }else if(roadType === 'rt2'){
            feeValue = halfRoadWidth * 4605;
          }
        }
        return feeValue;

      }

      const handleSecurityDeposit = (totalBuiltUp: number) =>{
        return totalBuiltUp*187.5;
      }

      const handleTentativeCharges = (halfPlotFrontage: number, roadWidth:number) =>{
          let feeValue=0,rate=0;
          let roadWidthFeet = roadWidth * 3.28084;
          if(roadWidthFeet<= 16){
            rate= 5460;
          }else if(roadWidthFeet <= 20){
            rate = 5640;
          }else if(roadWidthFeet <= 24){
            rate = 7620;
          }else if(roadWidthFeet <= 30){
            rate = 9660;
          }else if(roadWidthFeet <= 40){
            rate = 14900;
          }else if(roadWidthFeet <= 50){
            rate = 19670;
          }else if(roadWidthFeet <= 60){
            rate = 20250;
          }else if(roadWidthFeet <= 80){
            rate = 29700;
          }
          feeValue=halfPlotFrontage*rate;
          //street light
          if(roadWidth<=6){
            feeValue+=1800*halfPlotFrontage;
          }else if(roadWidth <= 7.5){
            feeValue+=2200*halfPlotFrontage;
          }else{
            feeValue+=3300*halfPlotFrontage;
          }

          if(roadWidthFeet > 40){
            feeValue+=23450*halfPlotFrontage;
          }

          return feeValue;
      }

      const handleCMDADevCharges = (landUsage: string, zoning: string, plotExtent: number, totalBuiltUp:number) => {
        let feeValue =0;
        if(landUsage==='Residential'){
          if(zoning==='Detached'){
            feeValue = plotExtent*4 + totalBuiltUp*10;
          }else{
            feeValue = plotExtent*5+ totalBuiltUp*12.5;
          }

        }else{
          if(zoning==='Detached'){
            feeValue = plotExtent*8 + totalBuiltUp*20;
          }else{
            feeValue = plotExtent*10+ totalBuiltUp*25;
          }
        }
        return feeValue;

      }

      const regChargeLand = (whetherReg: boolean, plotExtent:number) =>{
        if(whetherReg){
          return plotExtent*100;
        }
        return 0;
      }

      const wwf = (buildingHeight: number, plinth: number, totalBuiltUp : number) => {
        let feeValue = 0;
        if(buildingHeight<=12){
          feeValue = plinth * 61;
        }else if(buildingHeight<=24){
          feeValue = plinth * 116;
        }else{
          feeValue = plinth * 248;
        }
        feeValue += totalBuiltUp *236;
        return feeValue;
      }

      const midc = (totalBuiltUp: number) => {
        return totalBuiltUp*240;
      }

     
      const handleIACharges = (fsi: number) => {
        if(fsi>=300){
          return fsi*375;
        }
        return 0;

      }
      // Handle form submission
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        result.buildingLicenseFee = handleCalcBuildingLicenseFee(formData.totalBuiltUp, formData.wellOTHSump, formData.compoundWall, formData.wef, formData.proposedType);
        result.demolitionFee = handleDemolitionFee(formData.existingTiled, formData.existingOther, formData.existingFirst, formData.wef);
        result.roadCutCharges = handleRoadCutCharges(formData.wef,formData.roadType,formData.roadWidth/2);
        result.securityDeposit = handleSecurityDeposit(formData.totalBuiltUp);
        result.tentativeImprCharges = handleTentativeCharges(formData.proposedPlot/2, formData.roadWidth);
        result.cmdaDevCharges = handleCMDADevCharges(formData.landUsage, formData.zoning, formData.plotExtent, formData.totalBuiltUp);
        result.iaCharges = handleIACharges (formData.totalFSI);
        result.regCharge = regChargeLand(formData.whetherReg, formData.plotExtent);
        result.wwf = wwf(formData.buildingHeight, formData.plinth, formData.totalBuiltUp);
        result.midc = midc(formData.totalBuiltUp);
        setResult(result);
        navigate('/result', {state:{result:result, input: formData}})
    };

   return(
<>
      <form className="row g-3" onSubmit={handleSubmit}>
      <h2>Land Details</h2>
  <div className="col-md-6 d-flex">
    <b className="space">Zoning of land</b>
    <div>
      <input className="form-check-input" type="radio" 
      name="zoning" value="Continuous" 
      checked={formData.zoning === 'Continuous'}
      onChange={handleChange}
      id="flexRadioDefault1" 
      required
       />
      <label className="form-check-label space me-3" htmlFor="flexRadioDefault1">Continuous</label>

      <input className="form-check-input" type="radio" 
      checked={formData.zoning === 'Detached'}
      onChange={handleChange}
      name="zoning" value="Detached" id="flexRadioDefault2" required />
      <label className="form-check-label space me-3" htmlFor="flexRadioDefault2">Detached</label>

      <input className="form-check-input" type="radio" 
       name="zoning"
       checked={formData.zoning === 'EWS'}
        onChange={handleChange}
       value="EWS" id="flexRadioDefault3" required/>
      <label className="form-check-label space" htmlFor="flexRadioDefault3">EWS</label>
    </div>
  </div>

  <div className="col-md-6 d-flex align-items-center">
    <b className="me-3">Land usage</b>
    <select name="landUsage"
    value={formData.landUsage}
    onChange={handleStringChange}
    className="form-select w-auto">
      <option value="Commercial">Commercial</option>
      <option value="Residential">Residential</option>
      <option value="Mixed residential">Mixed residential</option>
    </select>
  </div>

  <div className="col-md-6 d-flex align-items-center">
    <b className="me-3">Type of Layout</b>
    <select name="typeOfLayout"
          value={formData.typeOfLayout}
          onChange={handleChange}
    className="form-select w-auto">
      <option value="unapproved">Unapproved Layout</option>
      <option value="approved">Approved Layout</option>
    </select>
  </div>

  <div className="col-md-6 d-flex">
    <label htmlFor="plotextent" className="form-label me-3"><b>Plot Extent(Sq. Mt.)</b></label>
    <input required name="plotExtent"
    value={formData.plotExtent}
    onChange={handleChange}
    type="number" className="form-control w-auto" id="plotextent" />
  </div>

  <div className="col-md-12 d-flex">
    <label htmlFor="totalLand" className="form-label me-3"><b>Total Land Extent Prior to 05.08.1975</b></label>
    <input required name="totalLand"
    value={formData.totalLand}
    onChange={handleChange}
    type="number" className="form-control w-auto" id="totalLand" />
  </div>

  <div className="col-md-12 d-flex align-items-center">
    <b className="me-3">Whether Regularisation Charges for Land Applicable?</b>
    <select name="whetherReg"
          onChange={handleChange}
    className="form-select w-auto">
      <option value="true">Yes</option>
      <option value="false">No</option>
    </select>
  </div>

  <div className="col-md-12 d-flex align-items-center">
    <b className="me-3">Calculation w.e.f 10/11/2023? (after 10/11)</b>
    <select required name="wef"
          onChange={handleChange}
    className="form-select w-auto">
      <option value="">--Choose--</option>
      <option value="true">Yes</option>
      <option value="false">No</option>
    </select>
  </div>

<h2 style={{marginTop:"20px"}}> Building Details</h2>

<div className="col-md-6 d-flex align-items-center">
        <b className="me-3">Proposed Type of Building</b>
        <select name="proposedType"
          value={formData.proposedType}
          onChange={handleChange}
        className="form-select w-auto">
        <option value="Commercial">Commercial</option>
        <option value="Residential">Residential</option>
        <option value="Mixed Residential">Mixed Residential</option>
        </select>
    </div>

    <div className="col-md-6 d-flex">
    <label htmlFor="width" className="form-label me-3"><b>Road Width (Mt.)</b></label>
    <input required name="roadWidth"
    value={formData.roadWidth}
    onChange={handleChangeNumber}
    type="number" className="form-control w-auto" id="width" />
    </div>

    <div className="col-md-6 d-flex">
    <label htmlFor="total" className="form-label me-3"><b>Total FSI Area (Sq. Mt.)</b></label>
    <input required name="totalFSI"
    value={formData.totalFSI}
    onChange={handleChangeNumber}
    type="number" className="form-control w-auto" id="total" />
    </div>

    <div className="col-md-6 d-flex align-items-center">
        <b className="me-3">Road Type</b>
        <select name="roadType"
          value={formData.roadType}
          onChange={handleStringChange}
        className="form-select w-auto">

        <option value="rt1">Interior Road - BT</option>
        <option value="rt2">Interior Road - CC</option>
        <option value="rt3">BRR</option>
        </select>
    </div>

    <div className="col-md-6 d-flex">
    <label htmlFor="totalb" className="form-label "><b>Total Built Up Area (Sq. Mt.)</b></label>
    <input required name="totalBuiltUp"
          value={formData.totalBuiltUp}
          onChange={handleChangeNumber}
    type="number" className="form-control w-auto" id="totalBuilt" />
    </div>

    <div className="col-md-6 d-flex">
    <label htmlFor="propo" className="form-label me-3"><b>Proposed Plot Frontage (Mt.)</b></label>
    <input required name="proposedPlot"
          value={formData.proposedPlot}
          onChange={handleChange}
    type="number" className="form-control w-auto" id="propo" />
    </div>

    <div className="col-md-6 d-flex">
    <label htmlFor="com" className="form-label me-3"><b>Compound Wall (R-M.)</b></label>
    <input required name="compoundWall"
          value={formData.compoundWall}
          onChange={handleChange}
    type="number" className="form-control w-auto" id="com" />
    </div>

    <div className="col-md-6 d-flex">
    <label htmlFor="well" className="form-label me-3"><b>Well/OHT/Sump & Septic Tank Area (Sq. Mt.)</b></label>
    <input required name="wellOTHSump"
          value={formData.wellOTHSump}
          onChange={handleChange}
    type="number" className="form-control w-auto" id="well" />
    </div>

    <div className="col-md-6 d-flex">
    <label htmlFor="ex" className="form-label me-3"><b>Existing Building Ground Floor Area (Tiled Floor Area) (Sq. Mt.)</b></label>
    <input type="number" required name="existingTiled"
          value={formData.existingTiled}
          onChange={handleChangeNumber}
    className="form-control w-auto" id="ex" />
    </div>

    <div className="col-md-6 d-flex">
    <label htmlFor="exi" className="form-label me-3"><b>Existing Building Ground Floor Area (Other Types) (Sq. Mt.)</b></label>
    <input type="number" name="existingOther"
          value={formData.existingOther}
          onChange={handleChangeNumber}
    className="form-control w-auto" id="exi" />
    </div>

    <div className="col-md-12 d-flex">
    <label htmlFor="exis" className="form-label me-3"><b>Existing Building First Floor and Above Total Area(Sq. Mt.)</b></label>
    <input type="number" name="existingFirst"
          value={formData.existingFirst}
          onChange={handleChangeNumber}
    className="form-control w-auto" id="exis" />
    </div>

    <div className="col-md-12 d-flex">
    <label htmlFor="buildingHeight" className="form-label me-3"><b>Building Height(Mt.)</b></label>
    <input type="number" name="buildingHeight"
          value={formData.buildingHeight}
          onChange={handleChangeNumber}
    className="form-control w-auto" id="buildingHeight" />
    </div>

    <div className="col-md-12 d-flex">
    <label htmlFor="plinth" className="form-label me-3"><b>Plinth Area</b></label>
    <input type="number" name="plinth"
          value={formData.plinth}
          onChange={handleChangeNumber}
    className="form-control w-auto" id="plinth" />
    </div>


    <div className="col-md-12 d-flex align-items-center">
    <b className="me-3">Whether Tentative improvement charges Applicable?</b>
    <select name="whetherTent"
          onChange={handleChange}
        className="form-select w-auto">
      <option value="true">Yes</option>
      <option value="false">No</option>
    </select>
    </div>

    <div className="col-md-12 d-flex align-items-center">
    <b className="me-3">Whether Regularisation Charges (penalty under section 244A) for Building Applicable?</b>
    <select name="whetherReg244"
          onChange={handleChange}
    className="form-select w-auto">
      <option value="true">Yes</option>
      <option value="false">No</option>
    </select>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</>
   );

}

export default LandDetails;