import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import gambar from "./image/gerry.jpg";
function App() {
  const example = [
    {
      name: "example",
      image: gambar,
    },
  ];

  // const [load, setLoad] = useState(true)
  const [datas, setDatas] = useState({
    data: "",
    loading: true,
  });
  const handleClick = async () => {
    const data = await axios.get("http://api-tesbvarta.herokuapp.com/home");
    setDatas({
      data: data,
      loading: false,
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={gambar} alt="gambar" className="App-logo2" />
        <h1>Gerry Pratama</h1>

        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div style={{ paddingTop: 20 }}>
        <button onClick={handleClick}>tombol</button>
      </div>
      <div
        style={{
          border: "1px solid black",
          borderRadius: "10px",
          marginTop: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "90%",
          marginLeft: 70,
          flexDirection: "row",
          padding: 15,
        }}
      >
        <table
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            // textalign: center,
            textAlign: "center",
            // bordercollapse: collapse,
            borderCollapse: "collapse",
            flexDirection: "row",
            border: "3px solid #ddd",
            width: "100%",
          }}
        >
          <div>
            <p>Longtitude</p>
            {datas.data.data?.data.map((item) => {
              return (
                <div>
                  <div>{item.longtitude}</div>
                </div>
              );
            })}
          </div>
          <div>
            <p>Latitude</p>
            {datas.data.data?.data.map((item) => {
              return (
                <div>
                  <div>{item.latitude}</div>
                </div>
              );
            })}
          </div>
          <div>
            <p>Brands</p>
            {datas.data.data?.data.map((item) => {
              return (
                <div>
                  <div>{item.brand}</div>
                </div>
              );
            })}
          </div>
          <div>
            <p>Ranges</p>
            {datas.data.data?.data.map((item) => {
              return (
                <div>
                  <div>{item.range}</div>
                </div>
              );
            })}
          </div>
          <div>
            <p>User Brand</p>
            {datas.data.data?.data.map((item) => {
              return (
                <div>
                  <div>{item.user_per_brand}</div>
                </div>
              );
            })}
          </div>
          <div>
            <p>total User</p>
            {datas.data.data?.data.map((item) => {
              return (
                <div>
                  <div>{item.total_user}</div>
                </div>
              );
            })}
          </div>
        </table>
      </div>
    </div>
  );
}

export default App;
