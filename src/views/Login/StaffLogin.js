import React, { Fragment } from "react";
import "../../styles/StaffInformation/staffInformation.scss";
import { AiOutlineCloseCircle } from "react-icons/ai";
import TableJob from "../../Components/Table";
import Nav from "../../Components/Header/Nav";
import callApi from "../../utils/apiCaller";
import { connect } from "react-redux";
import { nhapSo } from "../../Components/Function";
import { ToastContainer, toast } from 'react-toastify';
import { actFetchRequirementCustomer, actFetchServices } from "../../store/actions/index"
//import { w3cwebsocket as W3CWebSocket } from "websocket";


class StaffLogin extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      active: "active",
      date: "",
      headTableJob: {
        head: [ "Loại công việc","Ngày bắt đầu","Giờ bắt đầu","Họ tên khách Hàng","Địa chỉ","Nhận việc"],
        body: [null]
      },
      headrLisstJob: {
        head: [ "STT","Loại công việc","Trạng thái","Ngày bắt đầu","Giờ bắt đầu" ,"Xem"/*,"Địa chỉ","Số điện thoại" */],
        body: []
      },
      history :{
        head: [ "STT","Loại công việc","Trạng thái","Ngày bắt đầu","Giờ bắt đầu","Ngày kết thúc","Chi Tiết"/* "Giờ kết thúc","Họ tên khách Hàng","Địa chỉ","Số điện thoại","Sự cố" */],
        body: []
      },
      checkTable : "requirementCustomer",
      Price : "",
      nameServices : "",
      notify : "null",
      countPaginationRequirement : null,
      countPaginationTodoList : null,
      countPaginationHistory : null,
      servicesOfProvider : ["","",""],
      currentPaginationRequirement : 1,
      currentPaginationTodoList : 1,
      currentPaginationHistory :1,
      startPagination : 1,
      endPagination : 3,
      startPaginationHistory : 1,
      endPaginationHistory : 3
    };

    this.handleOnclickOpen = this.handleOnclickOpen.bind(this);
    this.hanleChangeDate = this.hanleChangeDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleActive1 = this.handleActive1.bind(this);
    this.handleActive2 = this.handleActive2.bind(this);
    this.handleOnclickClose = this.handleOnclickClose.bind(this)
    this.handleActiveAdd = this.handleActiveAdd.bind(this)
    this.handleOnchangePrice = this.handleOnchangePrice.bind(this)
    this.handleOnclickADD = this.handleOnclickADD.bind(this)
    this.notifySuccess = this.notifySuccess.bind(this)
    this.notifyFail = this.notifyFail.bind(this)
    this.handleOnclickPagination = this.handleOnclickPagination.bind(this)
    this.handleOnclickPaginationToDoList = this.handleOnclickPaginationToDoList.bind(this)
    this.handleOnclickPaginationHistory = this.handleOnclickPaginationHistory.bind(this)
    this.handleDeleteService = this.handleDeleteService.bind(this)
    this.SocketServiceOfProvider = this.SocketServiceOfProvider.bind(this)
    this.SocketTodoList = this.SocketTodoList.bind(this)
    this.SocketHistoryList = this.SocketHistoryList.bind(this)
    this.SocketPaginationRequirement = this.SocketPaginationRequirement.bind(this)
    this.SocketPaginationTodoList = this.SocketPaginationTodoList.bind(this)
    this.SocketPaginationHistory = this.SocketPaginationHistory.bind(this)
    this.addMessage = this.addMessage.bind(this)
    this.handleOnclickNext = this.handleOnclickNext.bind(this)
    this.handleOnclickPrevious = this.handleOnclickPrevious.bind(this)
  }
  handleOnclickNext = (value) => {
    let calPagination1
    let calPagination2
    let calPagination3
    calPagination1 = Math.ceil(this.state.countPaginationRequirement/8)
    calPagination2 = Math.ceil(this.state.countPaginationTodoList/8)
    calPagination3 = Math.ceil(this.state.countPaginationHistory/8)
    
    switch(value) {
      case "TodoList":
        if(calPagination2 > this.state.currentPaginationTodoList) {
          if(this.state.currentPaginationTodoList < 3){
            const check = document.querySelectorAll(".pagination .todolist")
            console.log(check)
            check[this.state.currentPaginationTodoList -1].classList.remove("active")
            check[this.state.currentPaginationTodoList].classList.add("active")
          }else{
            const check = document.querySelectorAll(".pagination .todolist")
            if(check[1].className === "todolist active"){
              check[1].classList.remove("active")
              check[2].classList.add("active")
            }else{
              this.setState({
                ...this.state,
                startPagination : this.state.startPagination + 1,
                endPagination : this.state.endPagination + 1
              },
                function () { 
                  const check = document.querySelectorAll(".pagination .todolist")
                  console.log(check )
                  check[1].classList.remove("active")
                  check[2].classList.add("active")
                }
              )
            }
          }
          var currentPagination2 = this.state.currentPaginationTodoList + 1
          this.setState({
            ...this.setState,
            currentPaginationTodoList : currentPagination2
          })
        }
        break;
      case "Requirement":
        if(calPagination1  > this.state.currentPaginationRequirement){
          if(this.state.currentPaginationRequirement < 3){
            const check = document.querySelectorAll(".pagination .requirement")
            check[this.state.currentPaginationRequirement -1].classList.remove("active")
            check[this.state.currentPaginationRequirement].classList.add("active")
          }else{
            const check = document.querySelectorAll(".pagination .requirement")
            if(check[1].className === "requirement active"){
              check[1].classList.remove("active")
              check[2].classList.add("active")
            }else{
              this.setState({
                ...this.state,
                startPagination : this.state.startPagination + 1,
                endPagination : this.state.endPagination + 1
              },
                function () { 
                  const check = document.querySelectorAll(".pagination .requirement")
                  check[1].classList.remove("active")
                  check[2].classList.add("active")
                }
              )
            }
          }
          var currentPagination1 = this.state.currentPaginationRequirement + 1
          this.setState({
            ...this.setState,
            currentPaginationRequirement : currentPagination1
          })
        }else{
          return
        }
        break;
      case "History":
        if(calPagination3 > this.state.currentPaginationHistory){

          if(this.state.currentPaginationHistory < 3){
            const check = document.querySelectorAll(".pagination .history")
            console.log(check)
            if(check[0].className === "history active"){
              check[0].className = "history"
              check[1].className = "history active"
            }else{
              if(check[1].className === "history active"){
                check[1].className = "history"
                check[2].className = "history active"
              }
            }
            /* check[this.state.currentPaginationHistory -1].classList.remove("active")
            check[this.state.currentPaginationHistory].classList.add("active") */
          }else{
            const check = document.querySelectorAll(".pagination .history")
            if(check[1].className === "history active"){
              check[1].classList.remove("active")
              check[2].classList.add("active")
            }else{
              this.setState({
                ...this.state,
                startPaginationHistory : this.state.startPaginationHistory + 1,
                endPaginationHistory : this.state.endPaginationHistory + 1
              },
                function () { 
                  const check = document.querySelectorAll(".pagination .history")
                  check[1].classList.remove("active")
                  check[2].classList.add("active")
                }
              )
            }
            if(check[0].className === "history active"){
              
              check[0].classList.remove("active")
              check[1].classList.add("active")
            }
          }
          var currentPagination3 = this.state.currentPaginationHistory + 1
          this.setState({
            ...this.setState,
            currentPaginationHistory : currentPagination3
          })
          //var currentPagination3 = this.state.currentPaginationHistory + 1
          

          /* if(this.state.countPaginationHistory < 3){
          const check = document.querySelectorAll(".pagination .history")
          check[this.state.currentPaginationHistory -1].classList.remove("active")
          check[this.state.currentPaginationHistory].classList.add("active")
          var currentPagination3 = this.state.currentPaginationHistory + 1
          }
          this.setState({
            ...this.setState,
            currentPaginationHistory : currentPagination3
          }) */
        }
      break;
      default:
        break;
    }
  }
  handleOnclickPrevious = (value) => {
    switch(value) {
      case "TodoList":
        if(this.state.currentPaginationTodoList > 1){
          var currentPagination = this.state.currentPaginationTodoList - 1
          if(this.state.currentPaginationTodoList <= 3 && this.state.endPagination <= 3){
            const check = document.querySelectorAll(".pagination .todolist")
            if(check[this.state.currentPaginationTodoList-1]){
              check[this.state.currentPaginationTodoList-1].classList.remove("active")
            }
            check[currentPagination-1].classList.add("active")
          }else{
            const check = document.querySelectorAll(".pagination .todolist")
            console.log(this.state.currentPaginationTodoList)
            if(check[2]){
              if(check[2].className === "todolist active"){
                console.log("đã vô")
                check[2].classList.remove("active")
                check[1].classList.add("active")
              }else{
                if(check[1].className === "todolist active"){
                  check[1].classList.remove("active")
                  check[0].classList.add("active")
                }
                if(check[0].className === "todolist active"){
                  this.setState({
                    ...this.state,
                  startPagination : this.state.startPagination - 1,
                  endPagination : this.state.endPagination - 1
                  },
                  function () { 
                    const check = document.querySelectorAll(".pagination .todolist") 
                    if(check[0].className === "todolist active"){
                      check[0].classList.remove("active")
                    }
                  }
                  )
                }
              }
            }else{
              console.log(check)
              if(check[1].className === "todolist active"){
                check[1].classList.remove("active")
                check[0].classList.add("active")
              }else{
                check[1].classList.add("active")
              }
              if(check[0].className === "todolist active"){
                this.setState({
                  ...this.state,
                startPagination : this.state.startPagination - 1,
                endPagination : this.state.endPagination - 1
                },
                function () { 
                  const check = document.querySelectorAll(".pagination .todolist") 
                  if(check[0].className === "todolist active"){
                    check[0].classList.remove("active")
                  }
                }
                )
              }
              
            }
          }
          this.setState({
            ...this.setState,
            currentPaginationTodoList : currentPagination
          })
        }
        break;
      case "Requirement":
        if(this.state.currentPaginationRequirement > 1){
          var currentPagination1 = this.state.currentPaginationRequirement - 1
          if(this.state.currentPaginationRequirement <= 3 && this.state.endPagination <= 3){
            const check = document.querySelectorAll(".pagination .requirement")
            if(check[this.state.currentPaginationRequirement-1]){
              check[this.state.currentPaginationRequirement-1].classList.remove("active")
            }
            check[currentPagination1-1].classList.add("active")
          }else{
            const check = document.querySelectorAll(".pagination .requirement")
            if(check[2]){
              if(check[2].className === "requirement active"){
                check[2].classList.remove("active")
                check[1].classList.add("active")
              }else{
                if(check[1].className === "requirement active"){
                  check[1].classList.remove("active")
                  check[0].classList.add("active")
                }
                if(check[0].className === "requirement active"){
                  this.setState({
                    ...this.state,
                  startPagination : this.state.startPagination - 1,
                  endPagination : this.state.endPagination - 1
                  },
                  function () { 
                    const check = document.querySelectorAll(".pagination .requirement") 
                    if(check[0].className === "requirement active"){
                      check[0].classList.remove("active")
                    }
                  }
                  )
                }
              }
            }else{
              console.log(check)
              if(check[1].className === "requirement active"){
                check[1].classList.remove("active")
                check[0].classList.add("active")
              }else{
                check[1].classList.add("active")
              }
              if(check[0].className === "requirement active"){
                this.setState({
                  ...this.state,
                startPagination : this.state.startPagination - 1,
                endPagination : this.state.endPagination - 1
                },
                function () { 
                  const check = document.querySelectorAll(".pagination .requirement") 
                  if(check[0].className === "requirement active"){
                    check[0].classList.remove("active")
                  }
                }
                )
              }
              
            }
          }
          this.setState({
            ...this.setState,
            currentPaginationRequirement : currentPagination1
          })
        }
        break;
      case "History":

        if(this.state.currentPaginationHistory > 1){
          var currentPagination2 = this.state.currentPaginationHistory - 1
          if(this.state.currentPaginationHistory < 3 && this.state.endPagination <= 3){
            const check = document.querySelectorAll(".pagination .history")
            console.log("vô 1")
            if(check[this.state.currentPaginationHistory-1]){
              check[this.state.currentPaginationHistory-1].classList.remove("active")
            }
            check[currentPagination2-1].classList.add("active")
          }else{
            const check = document.querySelectorAll(".pagination .history")
            console.log(check)
            if(check[2]){
              if(check[2].className === "history active"){
                console.log("vô 2")
                check[2].classList.remove("active")
                console.log(check[2])
                check[1].classList.add("active")
              }else{
                if(check[1].className === "history active"){
                  console.log("vô 3")
                  check[1].classList.remove("active")
                  check[0].classList.add("active")
                }
                if(check[0].className === "history active"){
                  console.log("đã vô 4")
                  console.log(check)
                  this.setState({
                    ...this.state,
                  startPaginationHistory : this.state.startPaginationHistory - 1,
                  endPaginationHistory : this.state.endPaginationHistory - 1
                  },
                  function () { 
                    console.log(this.state.startPagination,this.state.endPagination)
                    const check = document.querySelectorAll(".pagination .history") 
                    console.log(check)
                    if(check[0].className === "history active"){
                      check[0].classList.remove("active")
                    }
                  }
                  )
                }
              }
            }else{
              console.log(check)
              if(check[1].className === "history active"){
                check[1].classList.remove("active")
                check[0].classList.add("active")
              }else{
                check[1].classList.add("active")
              }
              if(check[0].className === "history active"){
                this.setState({
                  ...this.state,
                startPaginationHistory : this.state.startPaginationHistory - 1,
                endPaginationHistory : this.state.endPaginationHistory - 1
                },
                function () { 
                  //console.log(this.state.startPaginationHistory,this.state.endPaginationHistory)
                  const check = document.querySelectorAll(".pagination .history") 
                  if(check[0].className === "history active"){
                    check[0].classList.remove("active")
                  }
                }
                )
              }
              
            }
          }
          this.setState({
            ...this.setState,
            currentPaginationHistory : currentPagination2
          })
        }
      break;
      default:
        break;
    }
  }
  handleOnclickOpen = (name) => {
    const table = document.getElementById(name);
    table.style.display = "block";
  };
  hanleChangeDate = (event) => {
    this.setState({
      date: event.target.value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.date);
    if (this.state.date === "") {
      alert("Vui lòng chọn ngày");
    }
  };

  handleOnclickClose = (name) => {
    document.getElementById(name).style.display = "none"
  }
  handleActive1 = () => {
    document.getElementById("button-job2").classList.remove("active-button")
    document.getElementById("button-job1").classList.add("active-button")
    this.setState({
      ...[this.state],
      checkTable : "requirementCustomer",
      currentPaginationTodoList : 1,
      startPagination : 1,
      endPagination : 3
    })
  }

   handleActive2 = () => {
    document.getElementById("button-job1").classList.remove("active-button")
    document.getElementById("button-job2").classList.add("active-button")
    this.setState({
      ...[this.state],
      checkTable : "todoList",
      currentPaginationRequirement : 1,
      startPagination : 1,
      endPagination : 3
    })
  }

  handleActiveAdd = (event) =>{
    const check = document.querySelector(".addPrice.active")
    if (check != null){
      check.className = "addPrice"
    }
    event.target.className += " active"
    this.setState({
      ...[this.state],
      nameServices : event.target.textContent
    })
  }

  handleOnchangePrice = (value) =>{
    this.setState({
      ...[this.state],
      Price : value
    })
  }
  handleOnclickADD = () =>{
    callApi("addprice","POST",{ "Id": parseInt(localStorage.getItem("ProviderID")), "NameServices" : this.state.nameServices, "Price" : parseInt(this.state.Price) }).then(res =>{
       if(res.data.result === "True" || res.data.result === "Update thành công"){
          this.setState({
            ...[this.state]
          })
          this.notifySuccess()
       }else{
        this.setState({
          ...[this.state]
        })
        this.notifyFail()
       }
    })
  }

  notifySuccess = () => toast("Thành công", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,

  });

  notifyFail = () => toast.error("Vui lòng thử lại", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,

  });

  handleOnclickPagination = (event) =>{
    /* const check = document.querySelectorAll(".pagination .active")
    console.log(check)
    if (check.length > 0){
      check[0].className = "requirement"
    }
    event.target.className = "requirement active"
    this.setState({
      ...this.state,
      currentPaginationRequirement : parseInt(event.target.textContent)
    }) */
    const check = document.querySelector(".requirement.active")
    console.log(check)
    if(check){
      check.className = "requirement"
    }
    event.target.className = "requirement active"
    const check1 = document.querySelectorAll(".pagination .requirement")
    console.log(">>>>>>>",check1)
    if(check1[0].className === "requirement active"){
      console.log("đã vô 4")
      console.log(check)
      if(this.state.startPagination > 1){
        this.setState({
          ...this.state,
          currentPaginationRequirement : parseInt(event.target.textContent),
          startPagination : this.state.startPagination - 1,
          endPagination : this.state.endPagination - 1
        },
        function () { 
          console.log(this.state.startPaginationHistory,this.state.endPaginationHistory)
          const check2 = document.querySelectorAll(".pagination .requirement") 
          console.log(check2)
          if(check2[0].className === "requirement active"){
            check2[0].classList.remove("active")
          }
        }
        )
      }else{
        this.setState({
          ...this.state,
          currentPaginationRequirement : parseInt(event.target.textContent),
        },
        function () { 
          console.log(this.state.startPaginationHistory,this.state.endPaginationHistory)
          const check2 = document.querySelectorAll(".pagination .requirement") 
          console.log(check2)
          if(check2[0].className === "requirement active"){
            check2[0].classList.remove("active")
          }
        }
        )
      }
    }else{
      this.setState({
        ...this.state,
        currentPaginationRequirement : parseInt(event.target.textContent)
      })
    }

  }

  handleOnclickPaginationToDoList = (event) =>{
    /* const check = document.querySelectorAll(".pagination .active")
    console.log(check)
    if (check.length > 0){
      check[0].className = "todolist"
    }
    event.target.className = "todolist active"
    this.setState({
      ...this.state,
      currentPaginationTodoList : parseInt(event.target.textContent)
    }) */


    const check = document.querySelector(".todolist.active")
    console.log(check)
    if(check){
      check.className = "todolist"
    }
    event.target.className = "todolist active"
    const check1 = document.querySelectorAll(".pagination .todolist")
    console.log(">>>>>>>",check1)
    if(check1[0].className === "todolist active"){
      console.log("đã vô 4")
      console.log(check)
      if(this.state.startPagination > 1){
        this.setState({
          ...this.state,
          currentPaginationTodoList : parseInt(event.target.textContent),
          startPagination : this.state.startPagination - 1,
          endPagination : this.state.endPagination - 1
        },
        function () { 
          console.log(this.state.startPaginationHistory,this.state.endPaginationHistory)
          const check2 = document.querySelectorAll(".pagination .todolist") 
          console.log(check2)
          if(check2[0].className === "todolist active"){
            check2[0].classList.remove("active")
          }
        }
        )
      }else{
        this.setState({
          ...this.state,
          currentPaginationTodoList : parseInt(event.target.textContent),
        },
        function () { 
          console.log(this.state.startPaginationHistory,this.state.endPaginationHistory)
          const check2 = document.querySelectorAll(".pagination .todolist") 
          console.log(check2)
          if(check2[0].className === "todolist active"){
            check2[0].classList.remove("active")
          }
        }
        )
      }
    }else{
      this.setState({
        ...this.state,
        currentPaginationTodoList : parseInt(event.target.textContent)
      })
    }

  }
  handleOnclickPaginationHistory = async(event) =>{
    const check = document.querySelector(".history.active")
    console.log(check)
    check.className = "history"
    event.target.className = "history active"
    const check1 = document.querySelectorAll(".pagination .history")
    console.log(">>>>>>>",check1)
    if(check1[0].className === "history active"){
      console.log("đã vô 4")
      console.log(check)
      this.setState({
        ...this.state,
        currentPaginationHistory : parseInt(event.target.textContent),
        startPaginationHistory : this.state.startPaginationHistory - 1,
        endPaginationHistory : this.state.endPaginationHistory - 1
      },
      function () { 
        console.log(this.state.startPaginationHistory,this.state.endPaginationHistory)
        const check2 = document.querySelectorAll(".pagination .history") 
        console.log(check2)
        if(check2[0].className === "history active"){
          check2[0].classList.remove("active")
        }
      }
      )
    }else{
      this.setState({
        ...this.state,
        currentPaginationHistory : parseInt(event.target.textContent)
      })
    }

  }
  handleDeleteService = (value) =>{
    callApi("deleteservices","POST",{ "ProviderId" : parseInt(localStorage.getItem("ProviderID")), "ServicesId" : value }).then(res=>{
      try {
        if(res.data.result === "True"){
          this.notifySuccess()
        }
      } catch (error) {
        alert(error)
      }
    })
  }
  addMessage = (value) =>{
    this.setState({
      ...this.state,
      servicesOfProvider : value
    })
  }
  SocketServiceOfProvider = () =>{
    var ws = new WebSocket("wss://secure-journey-86451.herokuapp.com/provider/services")
    //var ws = new WebSocket("ws://localhost:8080/provider/services")
    ws.addEventListener('error', function (event) {
      console.log('WebSocket error: ', event);
    });
     //Triggered when connection is open
     ws.onopen = function (evt){
      console.log("Connection open SocketServiceOfProvider");
      var obj = { "Id" : localStorage.getItem("ProviderID")};
      ws.send(JSON.stringify(obj));
     }
      //Triggered when a message is received
     ws.onmessage = (res) => {
      const valuesArray = JSON.parse(res.data);
      /* if(res.data !== null){
        this.setState({
          ...this.state,
          servicesOfProvider : ["","",""]
        })
      } */
      this.setState({
        ...this.state,
        servicesOfProvider : valuesArray
      })
     };
     //Triggered when connection is closed
     ws.onclose = function (evt) {
       console.log("Connection closed SocketServiceOfProvider.");
     };
     
  }
  SocketRequirementCustomer = () =>{
    var socket = new WebSocket("wss://secure-journey-86451.herokuapp.com/requirementcustomer")
    //var socket = new WebSocket("ws://localhost:8080/requirementcustomer")
    socket.addEventListener('error', function (event) {
      console.log('WebSocket error: ', event);
    });
     //Triggered when connection is open
    socket.onopen = function (evt){
      console.log("Connection open SocketRequirementCustomer");
     }
      //Triggered when a message is received
    socket.onmessage = (res) => {
      if(res.data.length > 10){
        const valuesArray = JSON.parse(res.data);
        var dataPagination = []
        let start = 7 * (this.state.currentPaginationRequirement-1)
        if(start > 0){
          start = start + (this.state.currentPaginationRequirement-1) 
        }
        var end
        start === 0 ? end = 7 : end = start + 7
        for (var i= start; i<= end ;i++ ){
          if(valuesArray[i]){
            dataPagination.push(valuesArray[i])
          }
        }
        this.setState({
          ...this.state,
          headTableJob:{
            head : this.state.headTableJob.head,
            body: dataPagination
          },
        })
      }else{
        this.setState({
          ...this.state,
          headTableJob: {
            head: [ "Loại công việc","Ngày bắt đầu","Giờ bắt đầu","Họ tên khách Hàng","Địa chỉ","Nhận việc"],
            body: [null]
          },
        })
      }
      
      //console.log(">>>SocketRequirememmt",dataPagination)
      this.props.fetrequirementCustomer(res.data.result)
     };
     //Triggered when connection is closed
     socket.onclose = function (evt) {
       console.log("Connection closed. SocketRequirementCustomer");
     };
     
  }

  SocketTodoList = () =>{
    var ws = new WebSocket("wss://secure-journey-86451.herokuapp.com/todolist")
    //var ws = new WebSocket("ws://localhost:8080/todolist")
    ws.addEventListener('error', function (event) {
      console.log('WebSocket error: ', event);
    });
     //Triggered when connection is open
     ws.onopen = function (evt){
      console.log("Connection open SocketTodoList");
      var obj = {
         "Id" : localStorage.getItem("ProviderID")
        };
        ws.send(JSON.stringify(obj));
     }
      //Triggered when a message is received
     ws.onmessage = (res) => {
      if(res.data.length > 10){
        const valuesArray = JSON.parse(res.data);
        var dataPagination = []
        let start = 7 * (this.state.currentPaginationTodoList -1)
        if(start > 0){
          start = start + (this.state.currentPaginationTodoList-1) 
        }
        var end
        start === 0 ? end = 7 : end = start + 7

        for (var i = start; i<= end ;i++ )
          if(valuesArray[i]){
            dataPagination.push(valuesArray[i])
          }
        this.setState({
          ...this.state,
          headrLisstJob:{
            head : this.state.headrLisstJob.head,
            body: dataPagination/* .slice(0,dataPagination.length-1) */
          }
        })
      }
      //this.props.fetrequirementCustomer(res.data.result)
      //console.log("SocketTodo",dataPagination)
     };
     //Triggered when connection is closed
     ws.onclose = function (evt) {
       console.log("Connection closed SocketTodoList.");
     };
  }

  SocketHistoryList = () =>{
    var ws = new WebSocket("wss://secure-journey-86451.herokuapp.com/historyy")
    //var ws = new WebSocket("ws://localhost:8080/historyy")
    ws.addEventListener('error', function (event) {
      console.log('WebSocket error: ', event);
    });
     //Triggered when connection is open
     ws.onopen = function (evt){
      console.log("Connection open SocketHistoryList");
      var obj = {
         "Id" : parseInt(localStorage.getItem("ProviderID"))
        };
        ws.send(JSON.stringify(obj));
     }
      //Triggered when a message is received
     ws.onmessage = (res) => {
      const valuesArray = JSON.parse(res.data);
      //console.log(">>>>",valuesArray)
      var dataPagination = []
      let start = 7 * (this.state.currentPaginationHistory-1)
      if(start > 0){
        start = start + (this.state.currentPaginationRequirement-1) 
      }
      var end
      start === 0 ? end = 7 : end = start + 7
      
      for (var i= start; i<= end ;i++ )
        if(valuesArray[i]){
          dataPagination.push(valuesArray[i])
        }
      this.setState({
        ...this.state,
        history:{
          head : this.state.history.head,
          body: dataPagination/* .slice(0,dataPagination.length-1) */
        }
      })
      //this.props.fetrequirementCustomer(res.data.result)
      //console.log(">><<<><><><><><><><>",dataPagination)
     };
     //Triggered when connection is closed
     ws.onclose = function (evt) {
       console.log("Connection closed SocketHistoryList");
     };
  }
  SocketPaginationRequirement = () =>{
    var ws = new WebSocket("wss://secure-journey-86451.herokuapp.com/paginationrequirement")
    //var ws = new WebSocket("ws://localhost:8080/paginationrequirement")
    ws.addEventListener('error', function (event) {
      console.log('WebSocket error: ', event);
    });
     //Triggered when connection is open
     ws.onopen = function (evt){
      console.log("Connection open SocketPaginationRequirement");
      var obj = {
        "Status" : 0
        };
      ws.send(JSON.stringify(obj));
     }
      //Triggered when a message is received
     ws.onmessage = (res) => {
      const valuesArray = JSON.parse(res.data);
      this.setState({
        ...this.state,
        countPaginationRequirement : valuesArray.Count,
      })
     };
     //Triggered when connection is closed
     ws.onclose = function (evt) {
       console.log("Connection closed SocketPaginationRequirement");
     };
  }
  SocketPaginationTodoList = () =>{
    var ws = new WebSocket("wss://secure-journey-86451.herokuapp.com/paginationtodolist")
    //var ws = new WebSocket("ws://localhost:8080/paginationtodolist")
    ws.addEventListener('error', function (event) {
      console.log('WebSocket error: ', event);
    });
     //Triggered when connection is open
     ws.onopen = function (evt){
      console.log("Connection open SocketPaginationTodoList");
      var obj = {
        "Status" : 0,
        ProviderId : parseInt(localStorage.getItem("ProviderID"))
        };
        ws.send(JSON.stringify(obj));
     }
      //Triggered when a message is received
     ws.onmessage = (res) => {
      const valuesArray = JSON.parse(res.data);
      this.setState({
        ...this.state,
        countPaginationTodoList : valuesArray.Count
      })
     };
     ws.onclose = function (evt) {
       console.log("Connection closed SocketPaginationTodoList");
     };
  }
  SocketPaginationHistory = () =>{
    var ws = new WebSocket("wss://secure-journey-86451.herokuapp.com/paginationhistory")
    //var ws = new WebSocket("ws://localhost:8080/paginationhistory")
    ws.addEventListener('error', function (event) {
      console.log('WebSocket error: ', event);
    });
     //Triggered when connection is open
     ws.onopen = function (evt){
      console.log("Connection open SocketPaginationHistory");
      var obj = {
        "Status" : 1,
        ProviderId : parseInt(localStorage.getItem("ProviderID"))
        };
        ws.send(JSON.stringify(obj));
     }
      //Triggered when a message is received
     ws.onmessage = (res) => {
      const valuesArray = JSON.parse(res.data);
      this.setState({
        ...this.state,
        countPaginationHistory : valuesArray.Count
      })
     };
     //Triggered when connection is closed
     ws.onclose = function (evt) {
       console.log("Connection closed SocketPaginationHistory");
     };
  }


  async componentDidMount() {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    const tabs = $$(".tab-item");
    const panes = $$(".tab-pane");

    const tabActive = $(".tab-item.active");
    const line = $(".tabs .line");
    //const addPrice = $$(".addPrice")
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
     
    /* addPrice.forEach((item,index) =>{

    }) */

    // call API việc cần làm
    /* await callApi("todolist","POST",{ Id : localStorage.getItem("ProviderID"), Status : 0 }).then(res=>{
      try {
        this.setState({
          ...this.state,
          headrLisstJob:{
            head : this.state.headrLisstJob.head,
            body: res.data.result
          }
        })
      } catch (error) {
        alert(error)
      }
    }) */
    this.SocketTodoList()

    // call API nhận việc
    /* await callApi("requirementcustomer","POST",{ PaginationStart : 0, PaginationEnd : 6 }).then(res =>{
      try {
        this.setState({
          ...this.state,
          headTableJob:{
            head : this.state.headTableJob.head,
            body: res.data.result
          },
        })
        this.props.fetrequirementCustomer(res.data.result)
      } catch (error) {
        alert(error)
      }
    }) */
    this.SocketRequirementCustomer()
    // call API lịch sử cộng việc
    /* await callApi("todolist","POST",{ Id : localStorage.getItem("ProviderID"), Status : 1 }).then(res=>{
      try {
        this.setState({
          ...this.state,
          history:{
            head : this.state.headrLisstJob.head,
            body: res.data.result
          }
        })
      } catch (error) {
        alert(error)
      }
    }) */
    this.SocketHistoryList()
    /* this.SocketTodoList(1) */
    // call API danh sách dịch vụ
    await callApi("services","GET").then(res =>{
      try {
        if(res.data.result !== null || res.data.result !== "False"){
          this.props.fetServices(res.data.result)
          /* console.log("Services lấy được",res.data.result) */
        }
      } catch (error) {
        alert(error)
      }
    })
    // call API paginationRequirement
    /* await callApi("paginationrequirement","POST",{Status : 0}).then(res =>{
      try {
        if(res.data.result !==null){
          this.setState({
            ...this.state,
            countPaginationRequirement : res.data.result.Count
          })
        }else{
          alert("Faillllllllllllllllll")
        }
      } catch (error) {
        alert(error)
      }
    }) */
    this.SocketPaginationRequirement()
    // call API paginationTodoList
    /* await callApi("paginationtodolist","POST",{Status : 0, ProviderId : parseInt(localStorage.getItem("ProviderID"))}).then(res =>{
      try {
        if(res.data.result !==null){
          this.setState({
            ...this.state,
            countPaginationTodoList : res.data.result.Count
          })
        }else{
          alert("Faillllllllllllllllll")
        }
      } catch (error) {
        alert(error)
      }
    }) */
    this.SocketPaginationTodoList()
    // call API paginationTodoListHistory
    /* await callApi("paginationtodolist","POST",{Status : 1, ProviderId : parseInt(localStorage.getItem("ProviderID"))}).then(res =>{
      try {
        if(res.data.result !==null){
          this.setState({
            ...this.state,
            countPaginationHistory : res.data.result.Count
          })
        }else{
          alert("Faillllllllllllllllll")
        }
      } catch (error) {
        alert(error)
      }
    }) */
    this.SocketPaginationHistory()
    /* await callApi("provider/services","POST", { Id : localStorage.getItem("ProviderID") }).then(res=>{
      try {
        if(res.data.result !== null){
          this.setState({
            ...this.state,
            servicesOfProvider : res.data.result
          })
        }
      } catch (error) {
        alert(error)
      }
    }) */
    this.SocketServiceOfProvider()
    console.log(">>>>>>Đã vô DidMount")
  }

  /* componentWillUnmount(){
    socket.close()
  } */

  render() {
    //let checkTodoList
    let pagination1
    let pagination2
    let calPagination
    var showPaginationRequirement = []
    var showPaginationTodoList = []
    var showPaginationHistory = []
    if(this.state.countPaginationRequirement !== null ){
      calPagination = Math.ceil(this.state.countPaginationRequirement/8)
      var countBreak = 0
      for(var i = this.state.startPagination; i<= calPagination; i++){
        countBreak ++
        showPaginationRequirement.push(
          <div className={ i === 1? "requirement active" : "requirement"} key={i}  onClick={this.handleOnclickPagination}>{i}</div>
        )
        if(countBreak >=3){
          break
        }
      }
    }
    if(this.state.countPaginationTodoList !== null){
      calPagination = Math.ceil(this.state.countPaginationTodoList/8)
      for(  i = this.state.startPagination; i<= calPagination; i++){
        showPaginationTodoList.push(
          <div className={i === 1? "todolist active" : "todolist"} key={i} onClick={this.handleOnclickPaginationToDoList}>{i}</div>
        )
        if(i === this.state.endPagination){
          break
        }
      }
    }
    if(this.state.countPaginationHistory !== null){
      calPagination = Math.ceil(this.state.countPaginationHistory/8)
      for( i = this.state.startPaginationHistory; i<= calPagination; i++){
        showPaginationHistory.push(
          <div className={i === 1? "history active" : "history"} key={i} onClick={this.handleOnclickPaginationHistory}>{i}</div>
        )
        if(i === this.state.endPaginationHistory){
          break
        }
      }
    }
    let tableShow
    if(this.state.checkTable === "requirementCustomer"){
      if(this.state.headTableJob.body[0] !== null ){
        tableShow = (
          <>
            <div className="tablejob-1" id="tablejob-1"> <TableJob typeTable={"requirementcustomer"} addTableHead={ this.state.headTableJob.head} addTableBody={ this.state.headTableJob.body} /></div>
            <div className="center">
              <div className="pagination">
                  <div onClick={()=> this.handleOnclickPrevious("Requirement")}>&laquo;</div>
                  {showPaginationRequirement}
                  <div onClick={()=> this.handleOnclickNext("Requirement")}>&raquo;</div>
              </div>
            </div>
          </>
        )
      }else{
        tableShow = (
          <h2> Không có yêu cầu khách hàng </h2>
        )
      }
    }
    if(this.state.checkTable === "todoList"){
      if(typeof(this.state.headrLisstJob.body[0]) !== 'string' ){
        tableShow = (
          <div className="tablejob-2" id="tablejob-2"> <TableJob typeTable={"todoList"} addTableHead={ this.state.headrLisstJob.head} addTableBody = { this.state.headrLisstJob.body }/></div>
        )
        pagination1 = (
          <div className="pagination">
            <div onClick={()=> this.handleOnclickPrevious("TodoList")}>&laquo;</div>
            {showPaginationTodoList}
            <div onClick={()=> this.handleOnclickNext("TodoList")}>&raquo;</div>
          </div>
        )
      }else{
        tableShow = (
          <div className="tablejob-2" id="tablejob-2">
            <h2>Bạn không có việc cần làm</h2>
          </div>
        )
      }
    }
    let checkHistory
    if(typeof(this.state.history.body[0]) !== 'string'){
      checkHistory =(
        <div className="history-table" id=""> <TableJob typeTable={"history"} addTableHead={ this.state.history.head} addTableBody={ this.state.history.body} /></div>
      )
      pagination2 = (
        <div className="pagination">
          <div onClick={()=> this.handleOnclickPrevious("History")}>&laquo;</div>
          {showPaginationHistory}
          <div onClick={()=> this.handleOnclickNext("History")}>&raquo;</div>
        </div>
      )
    }else{
      checkHistory= (
        <div className="history-table" id="">
            <h2>Bạn không có lịch sử công việc</h2>
        </div>
      )
    }
    var showServices = []
    if(typeof(this.props.services) !== "undefined" && this.props.services !== "False"){
      this.props.services.map((item,index) => (
        showServices.push(
          <div key={index}>
            <div className="addPrice" onClick={(event)=> this.handleActiveAdd(event)}>{item.NameServices}</div>
          </div>
        )
      ))
    }


    return (
      <> 
        <Nav isloggin = {this.props.isloggin} handleLogOut={this.props.handleLogOut}/>
        <div className="Body-Home">
          <div className="container p-4">
            <div>
              <div className="tabs">
                <div className="tab-item active">
                  <i className="tab-icon fas fa-code"></i>
                  Thực hiện công việc           
                </div>
                <div className="tab-item">
                  <i className="tab-icon fas fa-cog"></i>
                  Lịch sử công việc
                </div>
                <div className="tab-item">
                  <i className="tab-icon fas fa-plus-circle"></i>
                  Danh sách công việc             
                </div>
                <div className="tab-item">
                  <i className="tab-icon fas fa-plus-circle"></i>
                  Giới thiệu
                </div>
                <div className="line"></div>
              </div>
              <div className="tab-content">

              <div className="tab-pane active">
                  <h2>Thực hiện công việc</h2>
                  <div className="table-job ">
                      <div className="wrapper-button-job">
                        <div className="button-job active-button" id="button-job1" onClick={ () => this.handleActive1()}>List nhận việc</div>
                        <div className="button-job" id="button-job2" onClick={ () => this.handleActive2()}>List công việc cần làm</div>
                      </div>
                      <div className="wrapper-tablejob">
                        {/* <div className="tablejob-1" id="tablejob-1"> <TableJob typeTable={"requirementcustomer"} addTableHead={ this.state.headTableJob.head} addTableBody={ this.state.headTableJob.body} /></div>
                        {checkTodoList} */}
                        {tableShow}
                      </div>
                      <div className="center">
                          {pagination1}
                      </div>
                  </div>
                </div>
                <div className="tab-pane">
                  <h2>Lịch sử công việc</h2>
                  <div className="history-job ">
                    <div className="history-wrapper">
                      {checkHistory}
                    </div>
                    <div className="center">
                         {pagination2}
                      </div>
                  </div>
                </div>
                <div className="tab-pane">
                  <h2>Danh sách công việc</h2>
                  <div className="table-custom align-middle pt-3">
                    <div className="btn btn-danger addition" onClick={() => this.handleOnclickOpen("container-add-job")}>Thêm</div>
                    {this.state.servicesOfProvider === null ? null :
                      this.state.servicesOfProvider.map((item,index) =>(
                        <Fragment key={index}>
                          <div className="wrapper-table">
                            <div className="col">{item.NameServices}</div>
                            <div className="col">{item.Price} VNĐ</div>
                            <div className="col">
                              <button className="btn btn-danger" onClick={() => this.handleDeleteService(item.ServicesId)}>Xóa</button>
                            </div>
                          </div>
                        </Fragment>
                      ))
                    }
                  </div>
                </div>
                <div className="tab-pane ">
                  <h2>Giới Thiệu</h2>
                  <div className="col-12">
                    <p>
                      Phần giới thiệu đang phát triển
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-add-job" id="container-add-job">
          <div className="wrapper-add-job">
            <AiOutlineCloseCircle className="icon" onClick={ () => this.handleOnclickClose("container-add-job")}/>
            <div className="add-job">
              {showServices}
              <div className="hola">
                <input  
                  value={this.state.Price}
                  onKeyPress = {(event) => nhapSo(event)}
                  onChange={ (event) => this.handleOnchangePrice(event.target.value)}
                  placeholder="Nhập giá tiền" className="Price"/>
                <button className="Add" onClick={this.handleOnclickADD}>Thêm</button>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
              />
        {/* <div className="container-report-problem" id="container-report-problem">
              <div className="wrapper-report-problem">
                <AiOutlineCloseCircle className="icon" onClick={ () => this.handleOnclickClose("container-report-problem")}/>
                <h6 >Vui lòng nhập sự cố gặp phải trong quá trình làm việc</h6>
                <textarea rows="14" cols="60"></textarea>
                <button>Lưu</button>
              </div>
        </div> */}    
      </>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    services : state.services
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
      fetrequirementCustomer : (requirementCustomer) =>{
        dispatch(actFetchRequirementCustomer(requirementCustomer))
      },
      fetServices : (services) =>{
        dispatch(actFetchServices(services))
      }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(StaffLogin);
