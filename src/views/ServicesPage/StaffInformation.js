import React from "react";
import "../../styles/StaffInformation/staffInformation.scss";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsCalendar3 } from "react-icons/bs"
import Calendar from "../../Components/Calendar/Calendar ";
import { FiSend } from "react-icons/fi";
import Nav from "../../Components/Header/Nav";
import { nhapChu } from "../../Components/Function";
class StaffInformation extends React.Component {
  constructor(props) {
    super(props);
    // const current = new Date();
    // const date = `${current.getFullYear()}/${current.getMonth()+1}/${current.getDate()}`;
    this.state = {
      active: "active",
      date: "",
      hoten: "",
      sdt: "",
      value1: 0,
      value2: 0,
      value3: 0
    };

    this.handleOnclickThue = this.handleOnclickThue.bind(this);
    this.handleOnclickCloseThue = this.handleOnclickCloseThue.bind(this);
    this.hanleChangeDate = this.hanleChangeDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnclickHoTro = this.handleOnclickHoTro.bind(this);
    this.handeleOnChangeHoTen = this.handeleOnChangeHoTen.bind(this);
    this.handeleOnChangeSdt = this.handeleOnChangeSdt.bind(this);
    this.handleCloseHoTro = this.handleCloseHoTro.bind(this);
    this.handleOnChangeValueThaiDo = this.handleOnChangeValueThaiDo.bind(this)
    this.handleOnChangeValueSachSe = this.handleOnChangeValueSachSe.bind(this)
    this.handleOnChangeValueHaiLong = this.handleOnChangeValueHaiLong.bind(this)
    this.handleOnClickOpenCalendar = this.handleOnClickOpenCalendar.bind(this)
    this.handleOnClickCloseCalendar = this.handleOnClickCloseCalendar.bind(this)
  }

  handleOnclickThue = () => {
    const table = document.getElementById("table-wrapper");
    table.style.display = "block";
  };

  handleOnclickCloseThue = () => {
    const table = document.getElementById("table-wrapper");
    table.style.display = "none";
  };

  hanleChangeDate = (event) => {
    this.setState({
      date: event.target.value,
    });
  };

  handleOnclickHoTro = () => {
    document.getElementById("support-container").style.display = "block";
  };

  handleSubmit = () => {
    document.getElementById("support-container").style.display = "none";
  };

  handleCloseHoTro = () => {
    document.getElementById("support-container").style.display = "none";
  };

  handeleOnChangeHoTen = (event) => {
    this.setState({
      ...[this.props],
      hoten: event.target.value,
    });
  };

  handeleOnChangeSdt = (event) => {
    this.setState({
      ...[this.props],
      sdt: event.target.value,
    });
  };

  handleOnChangeValueThaiDo = (e) => {
    this.setState({ value1:e})
  }

  handleOnChangeValueSachSe = (e) => {
    this.setState({ value2:e})
  }

  handleOnChangeValueHaiLong = (e) => {
    this.setState({ value3:e})
  }

  

  handleOnClickOpenCalendar = () => {
    document.getElementById("calendarrrr").style.display = "block"
    document.getElementById("icon").style.display = "block"
  }

  handleOnClickCloseCalendar = () => {
    document.getElementById("calendarrrr").style.display = "none"
    document.getElementById("icon").style.display = "none"
  }

  componentDidMount() {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    const tabs = $$(".tab-item");
    const panes = $$(".tab-pane");

    const tabActive = $(".tab-item.active");
    const line = $(".tabs .line");

    requestIdleCallback(function () {
      line.style.left = tabActive.offsetLeft + "px";
      line.style.width = tabActive.offsetWidth + "px";
    });

    tabs.forEach((tab, index) => {
      const pane = panes[index];
      tab.onclick = function () {
        $(".tab-item.active").classList.remove("active");
        $(".tab-pane.active").classList.remove("active");

        line.style.left = this.offsetLeft + "px";
        line.style.width = this.offsetWidth + "px";

        this.classList.add("active");
        pane.classList.add("active");
      };
    });
  }

  componentWillUnmount() {}

  render() {

    return (
      <>
        <Nav />
        <div className="Body-Home">
          <div className="container p-4">
            <h5 className="mb-5">Th??ng tin c?? nh??n</h5>
            <div className="information-wrapper">
              <img src="" alt="Avarta " />
              <div className="information">
                <div>H??? T??n: Nguy???n Minh Nh???t</div>
                <div className="mt-3">CCCD: 12345678910</div>
                <div className="mt-3">?????a ch???: Cam Ranh Kh??nh H??a</div>
                <div className="mt-3">S??? ??i???n tho???i li??n h???: 0975661107</div>
                <div className="mt-3">????nh gi??</div>
              </div>
            </div>
            <button className="btn-custom" onClick={this.handleOnclickThue}>
              {" "}
              Thu??
            </button>
            <button className="btn-support" onClick={this.handleOnclickHoTro}>
              {" "}
              H??? tr???
            </button>
            <div>
              <div className="tabs">
                <div className="tab-item active">
                  <i className="tab-icon fas fa-code"></i>
                  Gi???i thi???u
                </div>
                <div className="tab-item">
                  <i className="tab-icon fas fa-cog"></i>
                  Danh s??ch c??ng vi???c
                </div>
                <div className="tab-item">
                  <i className="tab-icon fas fa-plus-circle"></i>
                  ????nh gi??
                </div>
                <div className="line"></div>
              </div>

              <div className="tab-content">
                <div className="tab-pane active">
                  <h2>Gi???i Thi???u</h2>
                  <p>
                    React makes it painless to create interactive UIs. Design
                    simple views for each state in your application, and React
                    will efficiently update and render just the right components
                    when your data changes.
                  </p>
                </div>
                <div className="tab-pane">
                  <h2>Danh s??ch c??ng vi???c</h2>
                  <div className="table-custom align-middle pt-3">
                    <div className="wrapper-table">
                      <div className="col">Lau nh??</div>
                      <div className="col">500.000 VN??</div>
                      <div className="col">
                        <button
                          className="btn btn-danger"
                          onClick={this.handleOnclickThue}
                        >
                          Thu??
                        </button>
                      </div>
                    </div>

                    <div className="wrapper-table">
                      <div className="col">Lau nh??</div>
                      <div className="col">500.000 VN??</div>
                      <div className="col">
                        <button className="btn btn-danger">Thu??</button>
                      </div>
                    </div>

                    <div className="wrapper-table">
                      <div className="col">Lau nh??</div>
                      <div className="col">500.000 VN??</div>
                      <div className="col">
                        <button className="btn btn-danger">Thu??</button>
                      </div>
                    </div>

                  </div>
                </div>
                <div className="tab-pane">
                  <div className="row">
                    <div className="containerr col-md-12 p-5 ">
                      <div className=" review-form rounded-2 mb-3 px-3 text-like">
                        <div className="row align-middle font-weight-bold justify-content-center">
                          <div className="col-md-2 font-weight-semibold py-3 fz-14">
                            Th??i ????? ph???c v???
                          </div>
                          <div className="range col-md-9 py-4 mt-1">
                            <div className="field">
                              <input
                                className="input-Review-1"
                                type="range"
                                max="100"
                                min="0"
                                value={this.state.value1}
                                step="1"
                                onChange={ (e) => this.handleOnChangeValueThaiDo(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-md-1 text-center py-3 value-range-1">
                            {this.state.value1}
                          </div>
                        </div>
                        <div className="row align-center font-weight-bold">
                          <div className="col-md-2 font-weight-semibold py-3 fz-13">
                            ????? s???ch s???
                          </div>
                          <div className="range col-md-9 py-4 mt-1">
                            <div className="field">
                              <input
                                className="input-Review-2"
                                type="range"
                                max="100"
                                min="0"
                                value={this.state.value2}
                                step="1"
                                onChange={ (e) => this.handleOnChangeValueSachSe(e.target.value) }
                              />
                            </div>
                          </div>
                          <div className="col-md-1 text-center py-3 value-range-2">
                            { this.state.value2 }
                          </div>
                        </div>
                        <div className="row align-center font-weight-bold">
                          <div className="col-md-2 font-weight-semibold py-3 fz-13">
                            S??? h??i l??ng
                          </div>
                          <div className="range col-md-9 py-4 mt-1">
                            <div className="field">
                              <input
                                className="input-Review-3"
                                type="range"
                                max="100"
                                min="0"
                                value={this.state.value3}
                                step="1"
                                onChange={ (e) => this.handleOnChangeValueHaiLong(e.target.value) }
                              />
                            </div>
                          </div>
                          <div className="col-md-1 text-center py-3 value-range-3">
                            { this.state.value3 }
                          </div>
                        </div>
                        <div className="review-input-block mt-5">
                          <textarea
                            rows="5"
                            cols="10"
                            placeholder="????nh gi?? c???a kh??ch h??ng v??? d???ch v???."
                            className="form-control rounded-2 p-3"
                          ></textarea>
                          <button className="send btn btn-submit  p-0 rounded-circle d-flex align-items-center justify-content-center text-white">
                            <FiSend />
                          </button>
                        </div>
                        <div className="area-review">
                          <div>User RanDom</div>
                          <div>abxxyzzzzz</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="table-wrapper" id="table-wrapper">
          <div className="table-thue">
            <div className="table-header">
              ABCD
              <AiOutlineCloseCircle
                className="icon"
                onClick={this.handleOnclickCloseThue}
              />
            </div>
            <div className="table-body">
              <div className="area-selected-wrapper">
                <div className="area-selected">
                  Lau nh??
                  <AiOutlineCloseCircle className="icons" />
                </div>

                <div className="area-selected">
                  D???n nh??
                  <AiOutlineCloseCircle className="icons" />
                </div>
                <div className="area-selected">
                  Qu??t nh??
                  <AiOutlineCloseCircle className="icons" />
                </div>
                <div className="area-selected">
                  R???a ch??n
                  <AiOutlineCloseCircle className="icons" />
                </div>
              </div>
              <div className="calendarrr pt-4">
                <form >
                  <label>H??? T??n:
                    <input />
                  </label>
                  
                  <label>S??? ??i???n tho???i:
                    <input />
                  </label>
                  
                  <label>Ch???n ng??y:
                    <input placeholder="dd/mm/yyyy" className="day" onKeyDown={(event) => this.handleOnKeyDown(event)}/>
                    <BsCalendar3 className="icon" onClick={this.handleOnClickOpenCalendar}/>
                  </label>
                  
                  <label>Ch???n gi???:
                    <input type="time" />
                  </label>          
                </form>
                <div className="calendarrrr" id="calendarrrr">
                  <Calendar />
                  <AiOutlineCloseCircle className="icon" id="icon" onClick={ this.handleOnClickCloseCalendar }/>
                  </div>
                <button className="btn btn-danger">Thu??</button>
              </div>
            </div>
          </div>
        </div>
        <div className="support-container" id="support-container">
          <div className="support-wrapper">
            <AiOutlineCloseCircle
              className="icon"
              onClick={this.handleCloseHoTro}
            />
            <div className="aloha">
              <h5>
                Vui l??ng nh???p h??? t??n s??? ??i??n tho???i, sau khi nh???n ???????c th??ng tin
                ch??ng t??i s??? li??n h??? nhanh nh???t c?? th???
              </h5>
              <form>
                <label>H??? T??n:</label>
                <input
                  type="text"
                  value={this.state.hoten}
                  onKeyPress={(event) => nhapChu(event)}
                  onChange={(event) => this.handeleOnChangeHoTen(event)}
                />
                <label>S??T:</label>
                <input
                  type="text"
                  maxLength="11"
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  value={this.state.sdt}
                  onChange={(event) => this.handeleOnChangeSdt(event)}
                />
                <input type="button" value="G???i" onClick={this.handleSubmit} />
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default StaffInformation;
