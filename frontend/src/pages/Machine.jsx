
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import BarChart from '../components/BarChart';
import BarLineChart_Sanluong from '../components/BarChart_Thoigian';
import BarChartStatus from '../components/BarChart_Status';
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import AppNavbar from '../components/Navbar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PerformanceChart from '../components/PerformanceChart';
import { Offcanvas } from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../css/Machine.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import BarChart_Error from '../components/BarChart_AnalysisError';


function Machine() {
  const BASE_URL = "http://10.15.26.170:3000";

  const [rawDataNotFilter, setRawDataNotFilter] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [monthLabels, setMonthLabels] = useState([]);
  const [monthLabelsChart2, setMonthLabelsChart2] = useState([]);
  const [labelsChart3, setLabelsChart3] = useState([]);
  const [statusDataValuesChart3, setStatusDataValuesChart3] = useState([]);
  const [timeRunMonthDataValues, setTimeRunMonthDataValues] = useState([]);
  const [timeErrorMonthDataValues, setTimeErrorMonthDataValues] = useState([]);
  const [timeStopMonthDataValues, setTimeStopMonthDataValues] = useState([]);
  const [productivityMonthDataValues, setProductivityMonthDataValues] = useState([]);
  const [selectedDay, setSelectedDay] = useState('');
  const [paramMachine, setParamMachine] = useState([]);
  const [statusMachine, setStatusMachine] = useState([]);
  const [errorsMachine, setErrorsMachine] = useState([]);
  const [yearLabels, setYearLabels] = useState([]);
  const [yearLabelsChart2, setYearLabelsChart2] = useState([]);
  const [productivityYearDataValues, setProductivityYearDataValues] = useState([]);
  const [timerRunYearDataValues, setTimeRunYearDataValues] = useState([]);
  const [timerErrorYearDataValues, setTimeErrorYearDataValues] = useState([]);
  const [timerStopYearDataValues, setTimeStopYearDataValues] = useState([]);
  const [machineInfor, setMachineInfor] = useState([]);
  const [machines, setMachines] = useState([]);
  const [totalTimeOn, setTotalTimeOn] = useState([]);
  const [showTimeWindowChart1, setShowTimeWindowChart1] = useState(false);
  const [showTimeWindowChart2, setShowTimeWindowChart2] = useState(false);
  const [showTimeWindowChart3, setShowTimeWindowChart3] = useState(false);
  const [showInforMachine, setShowInforMachine] = useState(false);
  const [showAnalysisError, setShowAnalysisError] = useState(false);
  const [performanceMachine, setPerformanceMachine] = useState(false);
  const [shootMachine, setShootMachine] = useState(false);

  const [labelsChartErr, setLabelsChartErr] = useState([]);
  const [dataValuesChartErr, setDataValuesChartErr] = useState([]);
  
  const [viewModeChart1, setViewModeChart1] = useState('month');
  const [toDateChart1, setToDateChart1] = useState(new Date());
  const [fromDateChart1, setFromDateChart1] = useState(() => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    return date;
  });

  const [tempViewModeChart1, setTempViewModeChart1] = useState('month');
  const [tempToDateChart1, setTempToDate] = useState(new Date());
  const [tempFromDateChart1, setTempFromDateChart1] = useState(() => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    return date;
  });

  const [viewModeChart2, setViewModeChart2] = useState('month');
  const [toDateChart2, setToDateChart2] = useState(new Date());
  const [fromDateChart2, setFromDateChart2] = useState(() => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    return date;
  });

  const [tempViewModeChart2, setTempViewModeChart2] = useState('month');
  const [tempToDateChart2, setTempToDateChart2] = useState(new Date());
  const [tempFromDateChart2, setTempFromDateChart2] = useState(() => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    return date;
  });


  const [toDateChart3, setToDateChart3] = useState(new Date());
  const [fromDateChart3, setFromDateChart3] = useState(() => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - 30);
    return date;
  });

  const [tempToDateChart3, setTempToDateChart3] = useState(new Date());
  const [tempFromDateChart3, setTempFromDateChart3] = useState(() => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - 30);
    return date;
  });
  

  const { machine_id } = useParams();
  const navigate = useNavigate();

  const getStatus = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/status?machine_id=${machine_id}`);
      const data = await res.json();
      setStatusMachine(data[0]);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getMachineInfor = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/machines/${machine_id}`);
      const data = await res.json();
      setMachineInfor(data[0]);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleUpdateTimeChart1 = () => {
    setFromDateChart1(tempFromDateChart1);
    setToDateChart1(tempToDateChart1);
    setViewModeChart1(tempViewModeChart1);
  };

  const handleCancelTimeChart1 = () => {
    setTempFromDateChart1(fromDateChart1);
    setTempToDate(toDateChart1);
    setTempViewModeChart1(viewModeChart1);
  };

  const handleUpdateTimeChart2 = () => {
    setFromDateChart2(tempFromDateChart2);
    setToDateChart2(tempToDateChart2);
    setViewModeChart2(tempViewModeChart2);
  };

  const handleCancelTimeChart2 = () => {
    setTempFromDateChart2(fromDateChart2);
    setTempToDateChart2(toDateChart2);
    setTempViewModeChart2(viewModeChart2);
  };

  const handleUpdateTimeChart3 = () => {
    setFromDateChart3(tempFromDateChart3);
    setToDateChart3(tempToDateChart3);
  };

  const handleCancelTimeChart3 = () => {
    setTempFromDateChart3(fromDateChart3);
    setTempToDateChart3(toDateChart3);
  };

  const handleLocationClick = async (location, isdtgroup) => {    
    const response = await fetch(`${BASE_URL}/api/machines?location=${encodeURIComponent(location)}&isdtgroup=${isdtgroup}`);
    const jsonData = await response.json();
    setMachines(jsonData);
    console.log(response)
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 0:
        return 'bg-danger';
      case 1:
        return 'bg-warning text-dark';
      case 2:
        return 'bg-success'; // text-dark để chữ không bị mờ trên nền vàng
      default:
        return 'bg-secondary';
    }
  };
    const convertStatusToString = (status) => {
    switch (status) {
      case 0:
        return 'Đang lỗi';
      case 1:
        return 'Đang dừng';
      case 2:
        return 'Đang chạy'; // text-dark để chữ không bị mờ trên nền vàng
      default:
        return 'NA';
    }
  };

  const statusName = (status) => {
    switch (status) {
      case 1:
        return "ĐANG CHẠY";
      case 2:
        return 'ĐANG LỖI';
      case 3:
        return 'ĐANG DỪNG'; // text-dark để chữ không bị mờ trên nền vàng
      default:
        return 'N/A';
    }
  };

  const getErrorsMachine = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/errorsmachine?machine_id=${machine_id}`);
      const data = await res.json();

      // Sắp xếp theo thời gian giảm dần
      const sortedData = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      // Lọc lỗi trùng theo timestamp
      const uniqueErrors = sortedData.filter((error, index, self) =>
        index === self.findIndex((e) => e.timestamp === error.timestamp)
      );

      setErrorsMachine(uniqueErrors);

      // ✅ Thống kê số lần mỗi loại lỗi xuất hiện (dựa trên error_message)
      const errorCountMap = {};
      data.forEach((item) => {
        const key = item.alarm_name;
        errorCountMap[key] = (errorCountMap[key] || 0) + 1;
      });

      // Chuyển về mảng và sắp xếp giảm dần
      const sortedStats = Object.entries(errorCountMap)
      .map(([message, count]) => ({ message, count }))
      .sort((a, b) => b.count - a.count);

      // Tách labels và dataValues cho chart
      const labels = sortedStats.map((item) => item.message);
      const dataValues = sortedStats.map((item) => item.count);

      // ✅ Truyền dữ liệu vào chart
      setLabelsChartErr(labels);
      setDataValuesChartErr(dataValues);

    } catch (err) {
      console.error(err.message);
    }
  };



  const getAllParamMachine = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/detailMachine?machine_id=${machine_id}`);
      const data = await res.json();
      setRawDataNotFilter(data);
      const dataFilter = Object.values(
        data.reduce((acc, item) => {
          const date = item.timestamp.slice(0, 10); // 'YYYY-MM-DD'
          // Nếu ngày chưa tồn tại hoặc timestamp mới hơn thì thay thế
          if (!acc[date] || new Date(item.timestamp) > new Date(acc[date].timestamp)) {
            acc[date] = item;
          }
          return acc;
        }, {})
      );
      //Tính tổng thời gian mở máy
      setTotalTimeOn(dataFilter.reduce((sum, item) => sum + (item.time_on || 0), 0));
      /////////////////
      setRawData(dataFilter);

      //Tính hiệu xuất của máy
      const normalizeDate = (iso) => new Date(iso).toISOString().split('T')[0];
      // B1: Sắp xếp theo thời gian giảm dần
      const sortedData = [...dataFilter].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      // B2: Nhóm mỗi ngày chỉ lấy 1 record gần nhất
      const groupedByDate = {};
      sortedData.forEach(item => {
        const date = normalizeDate(item.timestamp);
        if (!groupedByDate[date]) {
          groupedByDate[date] = item;
        }
      });     
      // B3: Lấy 2 ngày gần nhất
      const twoDatesNearest = Object.keys(groupedByDate).sort((a, b) => new Date(b) - new Date(a));

      // B4: Tính actualOutput
      const actualShootNearestDay = groupedByDate[twoDatesNearest[0]].shoot - groupedByDate[twoDatesNearest[1]].shoot;
      const timeOnNearestDay = groupedByDate[twoDatesNearest[0]].time_on;
      const shootNearestDay = groupedByDate[twoDatesNearest[0]].shoot;
      setShootMachine(shootNearestDay);
      

      //Tính thời gian cycle trung bình

      // 1. Lấy ngày gần nhất
      const dateNearest = [...new Set(data.map(item => normalizeDate(item.timestamp)))];
      const latestDate = dateNearest.sort((a, b) => new Date(b) - new Date(a))[0];

      // 2. Lọc dữ liệu của ngày đó
      const recordsToday = data.filter(item => normalizeDate(item.timestamp) === latestDate);

      // 3. Tính trung bình cycle
      const cycleValues = recordsToday.map(item => item.cycle).filter(c => c !== undefined && c !== null);
      const avgCycle = cycleValues.length > 0
        ? (cycleValues.reduce((a, b) => a + b, 0) / cycleValues.length).toFixed(2)
        : null;


      const performance = (actualShootNearestDay * avgCycle)/timeOnNearestDay;
      setPerformanceMachine(Number((performance * 100).toFixed(2)));


    } catch (err) {
      console.error(err.message);
    }
  };
  // useEffect(() => {
  //   if (!rawData.length || !selectedYear) return;

  //   const monthSetByYear = new Set(
  //     rawData
  //       .filter(d => new Date(d.timestamp).getFullYear().toString() === selectedYear)
  //       .map(d => new Date(d.timestamp).toISOString().slice(0, 7)) // YYYY-MM
  //   );

  //   const sortedMonths = Array.from(monthSetByYear).sort((a, b) => new Date(b) - new Date(a));
  //   setAvailableMonths(sortedMonths);

  //   if (!sortedMonths.includes(selectedMonth)) {
  //     setSelectedMonth(sortedMonths[0] || '');
  //   }
  // }, [selectedYear, rawData]);

  // useEffect(() => {
  //   if (!rawData.length || !selectedMonth || !selectedYear) return;

  //   const [year, month] = selectedMonth.split('-').map(Number);
  //   const filteredDays = rawData
  //     .filter((d) => {
  //       const date = new Date(d.timestamp);
  //       return date.getFullYear() === year && date.getMonth() + 1 === month;
  //     })
  //     .map((d) => new Date(d.timestamp).toISOString().slice(0, 10));

  //   const uniqueDays = [...new Set(filteredDays)].sort((a, b) => new Date(a) - new Date(b));
  //   setAvailableDays(uniqueDays);

  //   if (!uniqueDays.includes(selectedDay)) {
  //     setSelectedDay(uniqueDays[uniqueDays.length - 1] || '');
  //   }
  // }, [selectedMonth, selectedYear, rawData]);

  const offcanvasRef = useRef(null);
  const [offcanvasInstance, setOffcanvasInstance] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  //ĐÓng mở Offcanvas
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!offcanvasRef.current) return;

      // Nếu chuột ở sát mép trái
      if (e.clientX < 10 && !isOpen) {
        const instance = Offcanvas.getOrCreateInstance(offcanvasRef.current);
        instance.show();
        setOffcanvasInstance(instance);
        setIsOpen(true);

        // Khi offcanvas đóng (do nút close hoặc gọi .hide())
        offcanvasRef.current.addEventListener(
          'hidden.bs.offcanvas',
          () => setIsOpen(false),
          { once: true }
        );
      }

      // Nếu chuột di chuyển ra xa > 100px và đang mở → đóng lại
      if (e.clientX > 400 && isOpen && offcanvasInstance) {
        offcanvasInstance.hide();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isOpen, offcanvasInstance]);

  useEffect(() => {
    getStatus();
    getErrorsMachine();
    getAllParamMachine();                                         
    getMachineInfor();
  }, []);

  useEffect(() => {
    if (!selectedDay || !rawData.length) return;

    // Lọc dữ liệu trong ngày được chọn
    const dataInDay = rawData.filter(
      (d) => new Date(d.timestamp).toISOString().slice(0, 10) === selectedDay
    );

    // Tìm dữ liệu mới nhất trong ngày đó (timestamp lớn nhất)
    const latestData = dataInDay.reduce((latest, current) =>
      new Date(current.timestamp) > new Date(latest.timestamp) ? current : latest
    , dataInDay[0]); // giá trị khởi đầu
    setParamMachine(latestData);
  }, [selectedDay, rawData]);

  useEffect(() => {
    
      // Lấy tất cả ngày trong khoảng fromDateChart1 -> toDateChart1
    const getAllDaysInRange = (start, end) => {
      const days = [];
      const date = new Date(start);
      while (date <= end) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
      }
      return days;
    };

    // Lấy tất cả tháng trong khoảng fromDateChart1 -> toDateChart1
    const getAllMonthsInRange = (start, end) => {
      const months = [];
      const current = new Date(start.getFullYear(), start.getMonth(), 1);

      while (current <= end) {
        const key = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}`;
        months.push(key);
        current.setMonth(current.getMonth() + 1);
      }

      return months;
    };

    const daysInRange = getAllDaysInRange(fromDateChart1, toDateChart1);

    // Lọc dữ liệu trong khoảng thời gian
    const rangeFiltered = rawData.filter(d => {
      const ts = new Date(d.timestamp);
      return ts >= fromDateChart1 && ts <= toDateChart1;
    });

    const quantityMap = {};
    const timeRunMap = {};
    const timeErrorMap = {};
    const timeStopMap = {};

    rangeFiltered.forEach(d => {
      const dateStr = new Date(d.timestamp).toISOString().split('T')[0]; // "YYYY-MM-DD"
      quantityMap[dateStr] = d.product;
      timeRunMap[dateStr] = d.time_on;
      timeErrorMap[dateStr] = d.time_off;
      timeStopMap[dateStr] = d.time_off;
    });


    const sameYear = daysInRange[0].getFullYear() === daysInRange[daysInRange.length - 1].getFullYear();

    const dayLabels = daysInRange.map(d => {
      if (sameYear) {
        // Hiển thị "DD-MM" nếu trong cùng 1 năm
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        return `${day}-${month}`;
      } else {
        // Hiển thị "YYYY-MM-DD" nếu giao giữa hai năm
        return d.toISOString().split('T')[0];
      }
    });


    const productivityValues = daysInRange.map(d => {
      const dateStr = d.toISOString().split('T')[0];
      return quantityMap[dateStr] || 0;
    });


    setMonthLabels(dayLabels);
    setProductivityMonthDataValues(productivityValues);

    const quantityMonthMap = {};

    rangeFiltered.forEach((d) => {
      const ts = new Date(d.timestamp);
      const key = `${ts.getFullYear()}-${String(ts.getMonth() + 1).padStart(2, '0')}`;

      quantityMonthMap[key] = (quantityMonthMap[key] || 0) + d.product;
    });

    const monthKeys = getAllMonthsInRange(fromDateChart1, toDateChart1); // Từ bước 1

    const labels = monthKeys.map((key) => {
      const [year, month] = key.split('-');
      return `${parseInt(month)} - ${year}`;
    });

    const productivityMonthValues = monthKeys.map((key) => quantityMonthMap[key] || 0);


    setYearLabels(labels);
    setProductivityYearDataValues(productivityMonthValues);
    
  }, [rawData, showTimeWindowChart1]);

  useEffect(()=> {
    handleLocationClick(machineInfor.location, machineInfor.isdtgroup)
  }, [machineInfor]);

  useEffect(() => {  
      // Lấy tất cả ngày trong khoảng fromDateChart1 -> toDateChart1
    const getAllDaysInRange = (start, end) => {
      const days = [];
      const date = new Date(start);
      while (date <= end) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
      }
      return days;
    };

    // Lấy tất cả tháng trong khoảng fromDateChart1 -> toDateChart1
    const getAllMonthsInRange = (start, end) => {
      const months = [];
      const current = new Date(start.getFullYear(), start.getMonth(), 1);

      while (current <= end) {
        const key = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}`;
        months.push(key);
        current.setMonth(current.getMonth() + 1);
      }

      return months;
    };

    const daysInRange = getAllDaysInRange(fromDateChart2, toDateChart2);

    // Lọc dữ liệu trong khoảng thời gian
    const rangeFiltered = rawData.filter(d => {
      const ts = new Date(d.timestamp);
      return ts >= fromDateChart2 && ts <= toDateChart2;
    });


    const timeRunMap = {};
    const timeErrorMap = {};
    const timeStopMap = {};

    rangeFiltered.forEach(d => {
      const dateStr = new Date(d.timestamp).toISOString().split('T')[0]; // "YYYY-MM-DD"
      timeRunMap[dateStr] = d.time_on;
      timeErrorMap[dateStr] = d.time_off;
      timeStopMap[dateStr] = d.time_off;
    });


    const sameYear = daysInRange[0].getFullYear() === daysInRange[daysInRange.length - 1].getFullYear();

    const dayLabels = daysInRange.map(d => {
      if (sameYear) {
        // Hiển thị "DD-MM" nếu trong cùng 1 năm
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        return `${day}-${month}`;
      } else {
        // Hiển thị "YYYY-MM-DD" nếu giao giữa hai năm
        return d.toISOString().split('T')[0];
      }
    });


    const timeRunValue = daysInRange.map(d => {
      const dateStr = d.toISOString().split('T')[0];
      return timeRunMap[dateStr] || 0;
    });

    const timeErrorValue = daysInRange.map(d => {
      const dateStr = d.toISOString().split('T')[0];
      return timeErrorMap[dateStr] || 0;
    });

    const timeStopValue = daysInRange.map(d => {
      const dateStr = d.toISOString().split('T')[0];
      return timeStopMap[dateStr] || 0;
    });

    setMonthLabelsChart2(dayLabels);
    setTimeRunMonthDataValues(timeRunValue);
    setTimeErrorMonthDataValues(timeErrorValue);
    setTimeStopMonthDataValues(timeStopValue);

    const timeRunMonthMap = {};
    const timeErrorMonthMap = {};
    const timeStopMonthMap = {};

    rangeFiltered.forEach((d) => {
      const ts = new Date(d.timestamp);
      const key = `${ts.getFullYear()}-${String(ts.getMonth() + 1).padStart(2, '0')}`;

      timeRunMonthMap[key] = (timeRunMonthMap[key] || 0) + d.time_on;
      timeErrorMonthMap[key] = (timeErrorMonthMap[key] || 0) + d.time_off;
      timeStopMonthMap[key] = (timeStopMonthMap[key] || 0) + d.time_stop;
    });

    const monthKeys = getAllMonthsInRange(fromDateChart2, toDateChart2); // Từ bước 1

    const labels = monthKeys.map((key) => {
      const [year, month] = key.split('-');
      return `${parseInt(month)} - ${year}`;
    });

    const timeRunMonthValues = monthKeys.map((key) => timeRunMonthMap[key] || 0);
    const timeErrorMonthValues = monthKeys.map((key) => timeErrorMonthMap[key] || 0);
    const timeStopMonthValues = monthKeys.map((key) => timeStopMonthMap[key] || 0);

    setYearLabelsChart2(labels);
    setTimeRunYearDataValues(timeRunMonthValues);
    setTimeErrorYearDataValues(timeErrorMonthValues);
    setTimeStopYearDataValues(timeStopMonthValues);   
  }, [rawData, showTimeWindowChart2]);

  function generateTimestampsInRange(start, end, intervalMinutes = 5) {
  const timestamps = [];
  const current = new Date(start);
  while (current <= end) {
    timestamps.push(new Date(current));
    current.setMinutes(current.getMinutes() + intervalMinutes);
  }
  return timestamps;
}


  useEffect(() => {
    // Lọc dữ liệu trong khoảng thời gian
    const rangeFiltered = rawDataNotFilter.filter(d => {
      const ts = new Date(d.timestamp);
      return ts >= fromDateChart3 && ts <= toDateChart3;
    });
    

    // Sắp xếp theo thời gian tăng dần
    rangeFiltered.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));


    const rangeTimestamps = generateTimestampsInRange(fromDateChart3, toDateChart3, 5); // mỗi 5 phút

  const mappedData = rangeTimestamps.map(t => {
    const match = rangeFiltered.find(d => {
      const dataTime = new Date(d.timestamp);
      return Math.abs(dataTime - t) < 1000 * 60 * 2.5; // khớp trong ±2.5 phút
    });
    return match ? match.status : null;
  });

  const labels = rangeTimestamps.map(t =>
    t.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
  );

    // Cập nhật biểu đồ
    setLabelsChart3(labels);
    setStatusDataValuesChart3(mappedData);      // ví dụ: "Đang chạy"

    
  }, [rawData, showTimeWindowChart3]);

  const currentDataChartProductivity = viewModeChart1 === 'month' ? productivityMonthDataValues : productivityYearDataValues;

  const minValueProductivity = currentDataChartProductivity.length > 0 ? Math.min(...currentDataChartProductivity) : 0;
  const maxValueProductivity = currentDataChartProductivity.length > 0 ? Math.max(...currentDataChartProductivity) : 0;
  const avgValueProductivity = currentDataChartProductivity.length > 0
    ? currentDataChartProductivity.reduce((sum, val) => sum + val, 0) / currentDataChartProductivity.length
    : 0;

  const currentDataChart2Productivity = viewModeChart1 === 'month' ? timeRunMonthDataValues : timerRunYearDataValues;

  const minValueTimeRun = currentDataChart2Productivity.length > 0 ? Math.min(...currentDataChart2Productivity) : 0;
  const maxValueTimeRun = currentDataChart2Productivity.length > 0 ? Math.max(...currentDataChart2Productivity) : 0;
  const avgValueTimeRun = currentDataChart2Productivity.length > 0
    ? currentDataChart2Productivity.reduce((sum, val) => sum + val, 0) / currentDataChart2Productivity.length
    : 0;


  return (

    <div className="container-fluid" style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#e5e5e5'}}>     
      <AppNavbar />

      <div className="row mt-0 mb-0">
        <div className="col-lg-12">
          <div className="row g-1 mt-0">
            {/* Cột ảnh máy */}
            <div className="col-12 col-md-12 col-lg-3 ">
              <div className="bg-white border rounded shadow-sm w-100 h-100 overflow-hidden">
                <img
                  src={`${BASE_URL}${machineInfor.image_url}`}
                  className="w-100 h-100"
                  style={{
                    width: "100%",
                    maxHeight: "200px",   
                    objectFit: "cover" 
                  }}
                  alt="Machine"
                />
              </div>
            </div>
            
            <div className="col-lg-4 col-md-12 col-12">
              <div className="row g-1 mb-1">
                <div className="col-12 col-lg-8 col-md-12">
                  <div
                    className="border bg-white rounded-3 text-center fw-semibold shadow-sm d-flex flex-column justify-content-center text-dark"
                    style={{
                      height: '100px',
                      fontSize: '28px',
                      letterSpacing: '0.5px',
                      padding: '0 12px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                    title={'Thông tin chi tiết'}
                  >
                    {/* PHẦN HIỂN THỊ MÁY */}
                    <div
                      className="machine-title"
                      onClick={() => setShowInforMachine(true)}
                    >
                      {machineInfor?.machine_name || 'N/A'}
                    </div>

                    <div
                      className="d-flex justify-content-center align-items-center gap-2 mb-0 flex-wrap"
                      style={{ minHeight: '0px' }}
                    >
                      {showInforMachine && (
                        <div
                          style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            backgroundColor: 'rgba(0,0,0,0.4)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1050,
                            padding: '1rem', // thêm padding để tránh sát viền
                            overflowY: 'auto', // xử lý tràn nội dung
                          }}
                        >
                          <div
                            style={{
                              backgroundColor: '#fff',
                              padding: '1.5rem',
                              borderRadius: '1rem',
                              width: '100%',
                              maxWidth: '500px',
                              boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                              fontSize: '0.95rem',
                            }}
                          >
                            {/* Tiêu đề & nút đóng */}
                            <div className="d-flex justify-content-between align-items-center">
                              <h5 style={{ margin: 0, color: '#203E9A', fontWeight: '600' }}>Thông tin máy</h5>
                              <button
                                className="btn-close"
                                onClick={() => setShowInforMachine(false)}
                                style={{ fontSize: '0.9rem' }}
                              />
                            </div>

                            <hr />

                            {/* Grid layout - responsive */}
                            <div className="mt-2">
                              <div className="row g-2 align-items-center">
                                <div className="col-4 text-end fw-semibold">ID máy:</div>
                                <div className="col-8">
                                  <div className="bg-light px-3 py-2 border rounded fw-normal">
                                    {machineInfor.machine_id}
                                  </div>
                                </div>

                                <div className="col-4 text-end fw-semibold">Tên máy:</div>
                                <div className="col-8">
                                  <div className="bg-light px-3 py-2 border rounded fw-normal">
                                    {machineInfor.machine_name}
                                  </div>
                                </div>

                                <div className="col-4 text-end fw-semibold">Nhà máy:</div>
                                <div className="col-8">
                                  <div className="bg-light px-3 py-2 border rounded fw-normal">
                                    {machineInfor.location}
                                  </div>
                                </div>

                                <div className="col-4 text-end fw-semibold align-self-start">Thông tin khác:</div>
                                <div className="col-8">
                                  <div
                                    className="bg-light px-3 py-2 border rounded text-start fw-normal"
                                    style={{
                                      whiteSpace: 'pre-wrap',
                                      minHeight: '80px',
                                      maxHeight: '160px',
                                      overflowY: 'auto',
                                    }}
                                  >
                                    {machineInfor.information}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Nút điều khiển */}
                            <div className="d-flex justify-content-end mt-4 gap-2">
                              <button className="btn btn-secondary px-4" onClick={() => setShowInforMachine(false)}>
                                Đóng
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>


                    {/* DROPDOWN CHỌN LOCATION */}
                    <div
                      style={{
                        fontSize: '20px',
                        marginTop: '4px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      
                    <button
                      className="btn btn-light dropdown-toggle w-100"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      onClick={() =>
                        handleLocationClick(machineInfor.location, machineInfor.isdtgroup)
                      }
                      style={{
                        fontSize: '25px',
                        backgroundColor: 'transparent',
                        border: '0px solid #dee2e6',
                        borderRadius: '8px',
                        boxShadow: 'none',                        
                        padding: '0px 12px',
                      }}
                      
                    >
                      {machineInfor.location || 'Không có mô tả'}
                    </button>

                    <ul className="dropdown-menu text-center"
                        style={{
                          borderRadius: '10px',
                          padding: '6px 0',
                          fontSize: '25px',
                        }}
                    >
                      {machines
                        .filter((loc) => loc.location === machineInfor.location)
                        .map((loc, index) => (
                          <li key={index}>
                            <button
                              className="dropdown-item"
                              onClick={() => {
                                navigate(`/machines/${loc.machine_id}`);
                                window.location.reload();
                              }}
                            >
                              {loc.machine_name}
                            </button>
                          </li>
                        ))}
                    </ul>                     
                    </div>
                  </div>
                </div>

                <div className="col-12 col-lg-4">
                  <div
                    className={`border rounded-3 text-center fw-bold shadow d-flex align-items-center justify-content-center text-white ${getStatusClass(statusMachine?.status)}`}
                    style={{ height: '100px', fontSize: '20px' }}
                  >
                    {convertStatusToString(statusMachine?.status)}
                  </div>
                </div>         
              </div>
              {/* Hàng thông số */}
              <div className="row g-1 mt-1">
                {/* Thẻ Hiệu suất */}
                <div className="col-6 col-sm-4 col-lg-4">
                  <div
                    className="border rounded-3 text-center p-3 shadow-sm d-flex flex-column justify-content-between bg-white"
                    style={{ height: '120px' }}
                  >
                    <p
                      className="fw-semibold mb-2"
                      style={{ fontSize: '18px', color: 'rgba(32, 64, 154, 1)' }}
                    >
                      Hiệu suất
                    </p>

                    {paramMachine ? (
                      <>
                        <div className="d-flex justify-content-center align-items-center" style={{ height: '60px' }}>
                          <PerformanceChart performance={performanceMachine} />
                        </div>
                      </>
                    ) : (
                      <h5 className="m-0 text-dark">N/A</h5>
                    )}
                  </div>
                </div>

                {/* Thẻ Số shoot */}
                <div className="col-6 col-sm-4 col-lg-4">
                  <div
                    className="border rounded-3 text-center p-3 shadow-sm d-flex flex-column justify-content-between bg-white"
                    style={{ height: '120px' }}
                  >
                    <p
                      className="fw-semibold mb-2"
                      style={{ fontSize: '18px', color: 'rgba(32, 64, 154, 1)' }}
                    >
                      Số Shoot
                    </p>
                    <h5 className="m-0 text-dark">
                      {paramMachine ? `${shootMachine}` : 'N/A'}
                    </h5>
                  </div>
                </div>

                {/* Thẻ Thời gian chạy */}
                <div className="col-6 col-sm-4 col-lg-4">
                  <div
                    className="border rounded-3 text-center p-3 shadow-sm d-flex flex-column justify-content-between bg-white"
                    style={{ height: '120px' }}
                  >
                    <p
                      className="fw-semibold mb-2"
                      style={{ fontSize: '18px', color: 'rgba(32, 64, 154, 1)' }}
                    >
                      Tổng thời gian chạy (giờ)
                    </p>
                    <h5 className="m-0 text-dark">
                      {paramMachine ? `${totalTimeOn}` : 'N/A'}
                    </h5>
                  </div>
                </div>
              </div>

            </div>  


            <div className="col-12 col-lg-5 mb-0">
              <div className="card shadow-sm p-3 rounded-2 mt-0" style={{ height: '228px', overflow: 'hidden' }}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="text-danger fw-bold mb-0" style={{ fontSize: '18px' }}>
                    DANH SÁCH CẢNH BÁO
                  </h6>
                  <i
                    className="bi bi-eye-fill text-secondary"
                    style={{ cursor: 'pointer', fontSize: '18px' }}
                    title="Xem tất cả"
                    onClick={() => setShowAnalysisError(true)}
                  />
                </div>

                <div className="d-flex justify-content-center align-items-center gap-2 mb-0 flex-wrap" style={{ minHeight: '0px' }}>
                {showAnalysisError && (
                  <div
                    style={{
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      width: '100vw',
                      height: '100vh',
                      backgroundColor: 'rgba(0,0,0,0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 1050,
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: '#fff',
                        padding: '2.5rem',
                        borderRadius: '1rem',
                        width: '90%',
                        maxWidth: '800px',
                        height: '80%',
                        maxHeight: '550px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                        fontSize: '1rem',
                        overflowY: 'auto', // ✅ thêm scroll nếu biểu đồ cao
                      }}
                    >
                      {/* Tiêu đề & nút đóng */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h5 style={{ margin: 0, color: '#203E9A', fontWeight: '600' }}>Phân tích</h5>
                        <button
                          className="btn-close"
                          onClick={() => setShowAnalysisError(false)}
                          style={{ fontSize: '0.9rem' }}
                        />
                      </div>

                      <hr />

                      {/* Grid layout */}
                      <div
                        className="mt-1"
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '120px 1fr',
                          rowGap: '16px',
                          columnGap: '12px',
                          alignItems: 'center',
                        }}
                      >
                        {/* Có thể đặt các item phân tích theo grid ở đây */}
                      </div>

                      {/* ✅ Biểu đồ thống kê lỗi */}
                      <div style={{ height: '400px', marginTop: '2rem' }}>
                        <BarChart_Error
                          labels={labelsChartErr}
                          dataValues={dataValuesChartErr}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>


                <div className="table-responsive" style={{ maxHeight: '240px', overflowY: 'auto' }}>
                  <table className="table table-sm table-bordered">
                    <thead className="table-light">
                      <tr>                       
                        <th style={{ fontSize: '13px' }}>Mã</th>
                        <th style={{ fontSize: '13px' }}>Mô tả</th>
                        <th style={{ fontSize: '13px' }}>Thời điểm</th>
                      </tr>
                    </thead>
                    <tbody>
                      {errorsMachine?.length > 0 ? (
                        errorsMachine.map((err) => (
                          <tr key={err.id}>                           
                            <td style={{ fontSize: '13px' }}>{err.alarm_id}</td>
                            <td style={{ fontSize: '13px' }}>{err.alarm_name}</td>
                            <td style={{ fontSize: '13px' }}>{new Date(err.timestamp).toLocaleString()}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3" className="text-center text-muted" style={{ fontSize: '13px' }}>
                            Không có lỗi
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>             
          </div>         
      </div>

      {/* Biều đồ */}

      <div className="row g-2 mt-0">
        <div className="col-md-6 text-center">
          <div className="card p-3 shadow mt-0 d-flex flex-column" style={{ height: '450px' }}>
            <div className="d-flex justify-content-between align-items-center mb-0 px-3 flex-wrap" style={{ color: '#203E9A', fontWeight: 'bold', fontSize: '18px' }}>
              <div>BIỂU ĐỒ SẢN LƯỢNG</div>
              <div
                style={{ cursor: 'pointer', color: '#000080', fontWeight: '500', fontSize: '14px' }}
                onClick={() => setShowTimeWindowChart1(true)}
              >
                Thời gian: {fromDateChart1 && toDateChart1
                  ? `${fromDateChart1.toLocaleDateString('vi-VN')} → ${toDateChart1.toLocaleDateString('vi-VN')}`
                  : 'Chọn thời gian'}
              </div>
            </div>
            <div className="d-flex justify-content-center align-items-center gap-2 mb-0 flex-wrap" style={{ minHeight: '0px' }}>                    
              {showTimeWindowChart1 && (
                <div style={{
                  position: 'fixed',
                  top: 0, left: 0, width: '100vw', height: '100vh',
                  backgroundColor: 'rgba(0,0,0,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  zIndex: 1050
                }}>
                  <div style={{
                    backgroundColor: '#fff',
                    padding: '2rem',
                    borderRadius: '1rem',
                    width: '90%',
                    maxWidth: '480px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h5 style={{ margin: 0, color: '#203E9A' }}>🕒 Chọn khoảng thời gian</h5>
                      <button
                        className="btn-close"
                        onClick={() => setShowTimeWindowChart1(false)}
                        style={{ fontSize: '0.9rem' }}
                      />
                    </div>

                    <hr />

                    <div className="mt-3">
                      <label className="form-label fw-semibold">Từ ngày:</label>
                      <DatePicker
                        selected={tempFromDateChart1}
                        onChange={(date) => setTempFromDateChart1(date)}
                        dateFormat="dd/MM/yyyy"
                        className="form-control"
                        placeholderText="Chọn ngày bắt đầu"
                      />
                    </div>

                    <div className="mt-3">
                      <label className="form-label fw-semibold">Đến ngày:</label>
                      <DatePicker
                        selected={tempToDateChart1}
                        onChange={(date) => setTempToDate(date)}
                        dateFormat="dd/MM/yyyy"
                        className="form-control"
                        placeholderText="Chọn ngày kết thúc"
                      />
                    </div>

                    <div className="mt-3">
                      <label className="form-label fw-semibold">Hiển thị:</label>
                      <select
                        className="form-select"
                        value={tempViewModeChart1}
                        onChange={(e) => setTempViewModeChart1(e.target.value)}
                      >
                        <option value="month">Từng ngày</option>
                        <option value="year">Từng tháng</option>
                      </select>
                    </div>

                    <div className="d-flex justify-content-end mt-4 gap-2">
                      <button className="btn btn-outline-secondary" onClick={() => {
                        handleCancelTimeChart1()
                        setShowTimeWindowChart1(false)}}>Huỷ</button>
                      <button className="btn btn-primary" onClick={() => {
                        handleUpdateTimeChart1()
                        setShowTimeWindowChart1(false)}}>Cập nhật</button>
                    </div>
                  </div>
                </div>

              )}
              
            </div>

            {/* Biểu đồ */}
            <div style={{ flexGrow: 1, overflow: 'hidden' }}>
              {viewModeChart1 === 'month' ? (
                <BarChart labels={monthLabels} dataValues={productivityMonthDataValues}/>
              ) : (
                <BarChart labels={yearLabels} dataValues={productivityYearDataValues}/>
              )}
            </div>

            <div className="d-flex justify-content-between mt-2 px-3" style={{ fontSize: '14px', alignItems: 'center' }}>
              <div style={{ fontWeight: 'bold', color: '#203E9A' }}>Sản lượng (cái)</div>
              <div className="d-flex gap-3" style={{ color: 'orangered', fontWeight: 600 }}>
                <div>min: {minValueProductivity.toFixed(1)}</div>
                <div>max: {maxValueProductivity.toFixed(1)}</div>
                <div>avg: {avgValueProductivity.toFixed(1)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Biểu đồ thời gian */}
        <div className="col-md-6 text-center">
          <div className="card p-3 shadow mt-0 d-flex flex-column" style={{ height: window.innerWidth < 768 ? '450px' : '250px' }}>
            <div className="d-flex justify-content-between align-items-center mb-2 px-3 flex-wrap" style={{ color: '#203E9A', fontWeight: 'bold', fontSize: '18px' }}>
              <div>BIỂU ĐỒ THỜI GIAN</div>

              <div
                style={{ cursor: 'pointer', color: '#000080', fontWeight: '500', fontSize: '14px' }}
                onClick={() => setShowTimeWindowChart2(true)}
              >
                Thời gian: {fromDateChart2 && toDateChart2
                  ? `${fromDateChart2.toLocaleDateString('vi-VN')} → ${toDateChart2.toLocaleDateString('vi-VN')}`
                  : 'Chọn thời gian'}
              </div>
            </div>

            <div className="d-flex justify-content-center align-items-center gap-2 mb-0 flex-wrap" style={{ minHeight: '0px' }}>
                   
              {showTimeWindowChart2 && (
                <div style={{
                  position: 'fixed',
                  top: 0, left: 0, width: '100vw', height: '100vh',
                  backgroundColor: 'rgba(0,0,0,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  zIndex: 1050
                }}>
                  <div style={{
                    backgroundColor: '#fff',
                    padding: '2rem',
                    borderRadius: '1rem',
                    width: '90%',
                    maxWidth: '480px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h5 style={{ margin: 0, color: '#203E9A' }}>🕒 Chọn khoảng thời gian</h5>
                      <button
                        className="btn-close"
                        onClick={() => setShowTimeWindowChart2(false)}
                        style={{ fontSize: '0.9rem' }}
                      />
                    </div>

                    <hr />

                    <div className="mt-3">
                      <label className="form-label fw-semibold">Từ ngày:</label>
                      <DatePicker
                        selected={tempFromDateChart2}
                        onChange={(date) => setTempFromDateChart2(date)}
                        dateFormat="dd/MM/yyyy"
                        className="form-control"
                        placeholderText="Chọn ngày bắt đầu"
                      />
                    </div>

                    <div className="mt-3">
                      <label className="form-label fw-semibold">Đến ngày:</label>
                      <DatePicker
                        selected={tempToDateChart2}
                        onChange={(date) => setTempToDateChart2(date)}
                        dateFormat="dd/MM/yyyy"
                        className="form-control"
                        placeholderText="Chọn ngày kết thúc"
                      />
                    </div>

                    <div className="mt-3">
                      <label className="form-label fw-semibold">Hiển thị:</label>
                      <select
                        className="form-select"
                        value={tempViewModeChart2}
                        onChange={(e) => setTempViewModeChart2(e.target.value)}
                      >
                        <option value="month">Từng ngày</option>
                        <option value="year">Từng tháng</option>
                      </select>
                    </div>

                    <div className="d-flex justify-content-end mt-4 gap-2">
                      <button className="btn btn-outline-secondary" onClick={() => {
                        handleCancelTimeChart2()
                        setShowTimeWindowChart2(false)}}>Huỷ</button>
                      <button className="btn btn-primary" onClick={() => {
                        handleUpdateTimeChart2()
                        setShowTimeWindowChart2(false)}}>Cập nhật</button>
                    </div>
                  </div>
                </div>
              )}
              
            </div>

            {/* Biểu đồ */}
            <div style={{ flexGrow: 1, overflow: 'hidden' }}>
              {viewModeChart2 === 'month' ? (
                <BarLineChart_Sanluong labels={monthLabelsChart2} line1={timeErrorMonthDataValues} line2={timeStopMonthDataValues} line3={timeRunMonthDataValues}/>
              ) : (
                <BarLineChart_Sanluong labels={yearLabelsChart2} line1={timerErrorYearDataValues} line2={timerStopYearDataValues} line3={timerRunYearDataValues}/>
              )}
            </div>
            <div className="d-flex justify-content-between mt-2 px-3" style={{ fontSize: '14px', alignItems: 'center' }}>
              <div style={{ fontWeight: 'bold', color: '#203E9A' }}>Thời gian chạy (giờ)</div>
              <div className="d-flex gap-3" style={{ color: 'orangered', fontWeight: 600 }}>
                <div>min: {minValueTimeRun.toFixed(1)}</div>
                <div>max: {maxValueTimeRun.toFixed(1)}</div>
                <div>avg: {avgValueTimeRun.toFixed(1)}</div>
              </div>
            </div>
          </div>

          <div className="card p-3 shadow mt-0 d-flex flex-column" style={{ height: window.innerWidth < 768 ? '400px' : '200px' }}>
            <div className="d-flex justify-content-between align-items-center mb-2 px-3 flex-wrap" style={{ color: '#203E9A', fontWeight: 'bold', fontSize: '18px' }}>
              <div>BIỂU ĐỒ TRẠNG THÁI</div>

              {/* <div
                style={{ cursor: 'pointer', color: '#000080', fontWeight: '500', fontSize: '14px' }}
                onClick={() => setShowTimeWindowChart3(true)}
              >
                Thời gian: {fromDateChart3 && toDateChart3
                  ? `${fromDateChart3.toLocaleDateString('vi-VN', {hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric'})} → ${toDateChart3.toLocaleDateString('vi-VN', {hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric'})}`
                  : 'Chọn thời gian'}
              </div> */}
            </div>

            <div className="d-flex justify-content-center align-items-center gap-2 mb-0 flex-wrap" style={{ minHeight: '0px' }}>
                   
              {showTimeWindowChart3 && (
                <div style={{
                  position: 'fixed',
                  top: 0, left: 0, width: '100vw', height: '100vh',
                  backgroundColor: 'rgba(0,0,0,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  zIndex: 1050
                }}>
                  <div style={{
                    backgroundColor: '#fff',
                    padding: '2rem',
                    borderRadius: '1rem',
                    width: '90%',
                    maxWidth: '480px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h5 style={{ margin: 0, color: '#203E9A' }}>🕒 Chọn khoảng thời gian</h5>
                      <button
                        className="btn-close"
                        onClick={() => setShowTimeWindowChart3(false)}
                        style={{ fontSize: '0.9rem' }}
                      />
                    </div>

                    <hr />

                    <div className="mt-3">
                      <label className="form-label fw-semibold">Từ ngày:</label>
                      <DatePicker
                        selected={tempFromDateChart3}
                        onChange={(date) => setTempFromDateChart3(date)}
                        dateFormat="dd/MM/yyyy HH:mm"
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        className="form-control"
                        placeholderText="Chọn ngày bắt đầu"
                      />
                    </div>

                    <div className="mt-3">
                      <label className="form-label fw-semibold">Đến ngày:</label>
                      <DatePicker
                        selected={tempToDateChart3}
                        onChange={(date) => setTempToDateChart3(date)}
                        dateFormat="dd/MM/yyyy HH:mm"
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        className="form-control"
                        placeholderText="Chọn ngày kết thúc"
                      />
                    </div>

                    <div className="d-flex justify-content-end mt-4 gap-2">
                      <button className="btn btn-outline-secondary" onClick={() => {
                        handleCancelTimeChart3();
                        setShowTimeWindowChart3(false)}}>Huỷ</button>
                      <button className="btn btn-primary" onClick={() => {
                        handleUpdateTimeChart3();
                        setShowTimeWindowChart3(false)}}>Cập nhật</button>
                    </div>
                  </div>
                </div>
              )}
              
            </div>

            {/* Biểu đồ */}
            <div style={{ flexGrow: 1, overflow: 'hidden' }}>

              <BarChartStatus labels={labelsChart3} line1={statusDataValuesChart3}/>

            </div>
          </div>
        </div>
      </div>
    </div>   

      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasMachinesList"
        ref={offcanvasRef}
        aria-labelledby="offcanvasMachinesListLabel"
      >
        <div className="offcanvas-header mt-2">
          <h5 className="offcanvas-title" id="offcanvasMachinesListLabel" style={{
                        fontSize: '20px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        color: 'rgba(32, 64, 154, 1)',
                        fontWeight: 'bold',
                      }}>
            {`Danh sách máy tại ${machineInfor?.location || '---'}`}
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>

        <div className="offcanvas-body px-3 pt-3">
          {machines && machines.length > 0 ? (
            <ul className="list-unstyled m-0" >
              {machines
                .filter((loc) => loc.location === machineInfor.location)
                .map((loc, index) => (
                  <li
                    key={index}
                    className="mb-1 animate-fadein"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <button
                      className="w-100 text-start d-block px-3 py-2 rounded border-0 bg-transparent menu-item"
                      onClick={() => {
                        navigate(`/machines/${loc.machine_id}`);
                        window.location.reload();
                      }}
                    >
                      {loc.machine_name}
                    </button>
                  </li>
                ))}
            </ul>
          ) : (
            <p className="text-muted px-3">Không có máy nào tại vị trí này.</p>
          )}
        </div>
      </div>



    </div>

    

    
  );
}

export default Machine;
