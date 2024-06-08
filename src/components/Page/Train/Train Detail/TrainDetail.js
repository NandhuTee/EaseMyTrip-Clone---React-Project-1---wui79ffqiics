import React,{useState,useEffect} from "react";
import Navbar from "../../../components/NavBar/Navbar";
import Classes from "./TrainDetail.module.css";
import { useAuth } from "../../../components/Context";
import DatePicker from "react-datepicker";
import moment from "moment";
import TrainFromDetail from "../DropDown/TrainFromDetail";
import TrainToDetail from "../DropDown/TrainToDetail";
import TrainData from "./TrainData";

function TrainDetail(){
    const {traindepartureDate, setTrainDepartureDate,trainCity,trainToCity} = useAuth();
    const [trainFromOpen, setTrainFromOpen] = useState(false);
    const [trainToOpen, setTrainToOpen] = useState(false);
    const [searchResultsTrain, setSearchResultsTrain] = useState([]);
  const [errorPost, setErrorPost] = useState("");
  const [selectedOption, setSelectedOption] = useState(0);
  const [sliderValue, setSliderValue] = useState(2000);

  const [value, setValue] = useState("$gte");
  const [field, setField] = useState("fare");
  

  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
  };
    const CustomInput = ({ value, onClick }) => (
        <input
          type="text"
          className={Classes.inputTrain}
          value={moment(value).format("DD MMM YYYY")}
          onClick={onClick}
          readOnly
        />
      );
      const handleTrainCityInput = () => {
        setTrainFromOpen(!trainFromOpen);
      };
    const handleTrainCityToInput = () => {
        setTrainToOpen(!trainToOpen);
      };
    const handleCheckboxRatingChange = (value) => {
      setSelectedOption(value === selectedOption ? 0 : value);
    };
    const handleClickSet = (type, key, data) => {
      setField(type);
      setValue(key === value ? "$gte":key);
      setSelectedOption(data);
      // setPage(1);
      // setSearchHotelResults([]);
      // handleHotelSearch();
    };
  
    async function trainSearch() {
        try {
          const projectID = "wui79ffqiics";
          const dayAbbreviation = moment(traindepartureDate).format("ddd");
          const apiUrl = `https://academics.newtonschool.co/api/v1/bookingportals/train?&day=${dayAbbreviation}&search={"source":"${trainCity}","destination":"${trainToCity}"}&filter={"${field}":{"${value}":${selectedOption}}}`;
          const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
              projectID: projectID,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setSearchResultsTrain(data.data.trains);
          } else {
            const errorData = await response.json();
            setErrorPost(errorData.message);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          setErrorPost("An error occurred. Please try again.");
        }
      }
      useEffect(() => {
        trainSearch();
      }, [selectedOption,field,value]);
    return(
        <div>
            <Navbar/>
            <div className={Classes.TrainSearchSection}>
        <div className={Classes.searchBarTrainDiv} >
            <div className="w-[3%] max-[600px]:w-[15%] h-[100%] flex items-center max-[600px]:mt-[10px]">
                <img className="w-[100%]" src="https://www.easemytrip.com/images/train-img/train-icon.svg"/>
            </div>
          <div className={Classes.mainDivTrainRecordSearch}>
            <div
              onClick={handleTrainCityInput}
              className={Classes.searchFromTrainRecord}
            >
              <div className="h-[100%] flex items-center">
              <span className="text-[16px] text-[#000] cursor-pointer flex items-center">
                  {trainCity}
                </span>
              </div>
            </div>
          </div>
          {trainFromOpen && <TrainFromDetail onClose={handleTrainCityInput} />}

          <div className="h-[100%] w-[3%] flex flex-col justify-center items-center max-[600px]:hidden">
            <img
              className="h-[90%]"
              src="https://railways.easemytrip.com/Content/Train/img/list-arrow-lr.png"
            />
          </div>
          <div className={Classes.mainDivTrainRecordSearch}>
            <div
              onClick={handleTrainCityToInput}
              className={Classes.searchToTrainRecord}
            >
              <div className="h-[100%] flex items-center">
              <span className="text-[16px] text-[#000] cursor-pointer flex items-center">
                  {trainToCity}
                </span>
              </div>
            </div>
          </div>
          {trainToOpen && <TrainToDetail onClose={handleTrainCityToInput}  />}

          <div className="flex justify-center rounded-[5px] items-center h-[100%] w-[21%] max-[600px]:w-[100%]  bg-[#fff]">
            <div className="w-[95%] h-[90%] flex items-center">
              <DatePicker
                selected={traindepartureDate}
                onChange={(date) => setTrainDepartureDate(date)}
                minDate={new Date()}
                customInput={<CustomInput />}
              />
              <div className="w-[20%] h-[100%] flex items-center">
                <img className="opacity-[.3]" src="https://railways.easemytrip.com/Content/Train/img/calender-icon.png"/>
              </div>
            </div>
          </div>
          <div className="w-[16%] max-[600px]:w-[100%] max-[600px]:mb-[10px] h-[100%] flex justify-center items-center">
            <div
              className={Classes.searchButtonTrainRecords}
              onClick={trainSearch}
            >
              <h3>Modify Search</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[100%] h-[100%] bg-[#e8f2fa] flex justify-center">
        <div className="w-[80%] max-[600px]:w-[95%] h-[100%] flex flex-row gap-[20px]">
            <div className="w-[20%] max-[600px]:hidden flex flex-col">
              <div className={Classes.trainDataPage}>
              <div className="text-[#000] text-[14px] font-[600] ">
              <p>Filter By</p>
              </div>
            <div className="mt-[30px]">
              <p className="text-[#000] text-[12px] font-[600] ">Journey Coach filter</p>
              
              <div className="flex justify-between">
                <div className="mt-[10px] flex gap-[5px] text-[12px] font-[400] text-[#333] cursor-pointer">
                <label className="flex items-center gap-[5px]">
                    <input
                      type="checkbox"
                      value="600"
                      checked={selectedOption === 600}
                      onChange={() => handleCheckboxRatingChange(600)}
                      onClick={() => handleClickSet("fare", "$lte", 600)}
                    />{" "}
                    {" "}
                    Below - ₹ 600
                  </label>
                </div>
                <p style={{ marginTop: "10px" }}></p>
              </div>
              <div className="flex justify-between">
                <div className="mt-[10px] flex gap-[5px] text-[12px] font-[400] text-[#333] cursor-pointer">
                <label className="flex items-center gap-[5px]">
                    <input
                      type="checkbox"
                      value="1200"
                      checked={selectedOption === 1200}
                      onChange={() => handleCheckboxRatingChange(1200)}
                      onClick={() => handleClickSet("fare", "$lte", 1200)}
                    />{" "}
                    {" "}
                    ₹ 601 - ₹ 1200
                  </label>
                </div>
                <p style={{ marginTop: "10px" }}></p>
              </div>
              <div className="flex justify-between">
                <div className="mt-[10px] flex gap-[5px] text-[12px] font-[400] text-[#333] cursor-pointer">
                <label className="flex items-center gap-[5px]">
                    <input
                      type="checkbox"
                      value="1201"
                      checked={selectedOption === 1201}
                      onChange={() => handleCheckboxRatingChange(1201)}
                      onClick={() => handleClickSet("fare", "$gte", 1201)}
                    />{" "}
                    {" "}
                    ₹ 1201 - ₹ 1600
                  </label>
                </div>
                <p style={{ marginTop: "10px" }}></p>
              </div>
              <div className="flex justify-between">
                <div className="mt-[10px] flex gap-[5px] text-[12px] font-[400] text-[#333] cursor-pointer">
                <label className="flex items-center gap-[5px]">
                    <input
                      type="checkbox"
                      value="1601"
                      checked={selectedOption === 1601}
                      onChange={() => handleCheckboxRatingChange(1601)}
                      onClick={() => handleClickSet("fare", "$gte", 1601)}
                    />{" "}
                    {" "}
                    above - ₹ 1601
                  </label>
                </div>
                <p style={{ marginTop: "10px" }}></p>
              </div>
            </div>
            <div className="mt-[30px]">
              <p className="text-[#000] text-[12px] font-[600] ">Departure From {trainCity}</p>
              <div className="w-[100%]">
                <div className="w-[100%] bg-[#fff] mt-[5px] rounded-[5px] flex flex-col gap-[10px]">
                <div className="w-[100%] cursor-pointer flex flex-col mt-[10px]">
                  <label className="flex text-[12px] text-[#737373] items-center gap-[5px]">
                    <input
                      type="checkbox"
                      value="24"
                      checked={selectedOption === "24"}
                      onChange={() => handleCheckboxRatingChange("24")}
                      onClick={() =>  handleClickSet("departureTime", "$gte", "24")}
                    />{" "}
                    <span className="flex gap-[10px] items-center">Early Morning <span>12am - 6am</span></span>
                  </label>
                  </div>
                  <div className="w-[100%] cursor-pointer flex flex-col">
                  <label className="flex text-[12px] text-[#737373] items-center gap-[5px]">
                    <input
                      type="checkbox"
                      value="11"
                      checked={selectedOption === "11"}
                      onChange={() => handleCheckboxRatingChange("11")}
                      onClick={() =>  handleClickSet("departureTime", "$lte", "11")}
                    />{" "}
                    <span className="flex gap-[10px] items-center">Morning <span>7am - 11am</span></span>
                  </label>
                  </div>
                  <div className="w-[100%] cursor-pointer flex flex-col">
                  <label className="flex text-[12px] text-[#737373] items-center gap-[5px]">
                    <input
                      type="checkbox"
                      value="12"
                      checked={selectedOption === "12"}
                      onChange={() => handleCheckboxRatingChange("12")}
                      onClick={() =>  handleClickSet("departureTime", "$gte", "12")}
                    />{" "}
                    <span className="flex gap-[10px] items-center">Afternoon <span>12pm - 5pm</span></span>
                  </label>
                  </div>
                  <div className="w-[100%] cursor-pointer flex flex-col">
                  <label className="flex text-[12px] text-[#737373] items-center gap-[5px]">
                    <input
                      type="checkbox"
                      value="17"
                      checked={selectedOption === "17"}
                      onChange={() => handleCheckboxRatingChange("17")}
                      onClick={() =>  handleClickSet("departureTime", "$gte", "17")}
                    />{" "}
                    <span className="flex gap-[10px] items-center">Night <span>6pm - 12am</span></span>
                    
                  </label>
                  </div>
                </div>
              </div>
            </div>
              <div className="mt-[30px]">
              <p className="text-[#000] text-[12px] font-[600] ">Arrival To {trainToCity}</p>
              <div className="w-[100%]">
                <div className="w-[100%] bg-[#fff] mt-[5px] rounded-[5px] flex flex-col gap-[10px]">
                <div className="w-[100%] cursor-pointer flex flex-col mt-[10px]">
                  <label className="flex text-[12px] text-[#737373] items-center gap-[5px]">
                    <input
                      type="checkbox"
                      value="24"
                      checked={selectedOption === 24}
                      onChange={() => handleCheckboxRatingChange(24)}
                      onClick={() =>  handleClickSet("arrivalTime", "$gte", 24)}
                    />{" "}
                    <span className="flex gap-[10px] items-center">Early Morning <span>12am - 6am</span></span>
                  </label>
                  </div>
                  <div className="w-[100%] cursor-pointer flex flex-col">
                  <label className="flex text-[12px] text-[#737373] items-center gap-[5px]">
                    <input
                      type="checkbox"
                      value="11"
                      checked={selectedOption === 11}
                      onChange={() => handleCheckboxRatingChange(11)}
                      onClick={() =>  handleClickSet("arrivalTime", "$lte", 11)}
                    />{" "}
                    <span className="flex gap-[10px] items-center">Morning <span>7am - 11am</span></span>
                  </label>
                  </div>
                  <div className="w-[100%] cursor-pointer flex flex-col">
                  <label className="flex text-[12px] text-[#737373] items-center gap-[5px]">
                    <input
                      type="checkbox"
                      value="12"
                      checked={selectedOption === 12}
                      onChange={() => handleCheckboxRatingChange(12)}
                      onClick={() =>  handleClickSet("arrivalTime", "$gte", 12)}
                    />{" "}
                    <span className="flex gap-[10px] items-center">Afternoon <span>12pm - 5pm</span></span>
                  </label>
                  </div>
                  <div className="w-[100%] cursor-pointer flex flex-col">
                  <label className="flex text-[12px] text-[#737373] items-center gap-[5px]">
                    <input
                      type="checkbox"
                      value="17"
                      checked={selectedOption === 17}
                      onChange={() => handleCheckboxRatingChange(17)}
                      onClick={() =>  handleClickSet("arrivalTime", "$gte", 17)}
                    />{" "}
                    <span className="flex gap-[10px] items-center">Night <span>5pm - 12am</span></span>
                    
                  </label>
                  </div>
                </div>
              </div>
            </div>  
            
          </div>
            </div>
            <div className="w-[79%] max-[600px]:w-[100%] h-[100%]">
                <TrainData searchResultsTrain={searchResultsTrain}/>
            </div>
        </div>

      </div>
        </div>
    )
}
export default TrainDetail;