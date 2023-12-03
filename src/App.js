import React, {useState} from "react";
import {wait} from "@testing-library/user-event/dist/utils";

// const { Client } = require("pg");
//
//
// const client = new Client(process.env.DATABASE_URL);
//
// await client.connect()

function App(props) {
    const [loggedIn, setLoggedIn] = useState(false)
    const [state , setState] = useState({
        email : "",
        password : ""
    })
    const [selectedImage, setSelectedImage] = useState(null);
    const [showError, setShowError] = useState(null);

    const handleChange = (e) => {
        const {id , value} = e.target
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const handleSubmitClick = async (e) => {
        e.preventDefault();
        // const res = await client.query('SELECT COUNT(*) as counter' +
        //     'where id=$1 and pw=$2', [state.email, state.password])
        // const value = res.rows[0].message
        // if (value === 1) {
        //     setLoggedIn(true);
        //     return;
        // } else {
        //     return;
        // }
        if(state.email === 'admin' && state.password === 'admin123') {
            setLoggedIn(true);
        } else {
            displayError('Passwords do not match');
        }
    }

    const displayError = (error) => {
        setShowError(
            <div role="alert">
                <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                    Error
                </div>
                <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                    <p>{error}</p>
                </div>
            </div>
        )
        wait(1000).then(r => setShowError(null))
    }

    const handleUploadCLick = async (e) => {
        const file = e.target.files[0];
        getBase64(file).then(base64 => {
            localStorage["fileBase64"] = base64;
            console.debug("file stored",base64);
        });
    }
    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    }

    return loggedIn
      ? (
          <>
              <div className="container mx-auto px-4 h-full">
                  <div className="flex content-center items-center justify-center h-full">
                      <div className="w-full lg:w-4/12 px-4">
                          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                  The first step to building a world with non-biased facial recognition is simply
                                  to build a better dataset, something that is commonly missing
                                  <div className="relative w-full mb-3">
                                      {selectedImage && (
                                          <div>
                                              <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
                                              <br />
                                              <button onClick={()=>setSelectedImage(null)}>Remove</button>
                                          </div>
                                      )}
                                      <br />

                                      <br />
                                      <label
                                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                          htmlFor="grid-password"
                                      >
                                          Upload your image here
                                      </label>
                                      <input
                                          type="file"
                                          name="uploadedImage"
                                          onChange={(event) => {
                                              console.log(event.target.files[0]);
                                              setSelectedImage(event.target.files[0]);
                                              // upload(event);
                                          }}
                                      />
                                      <div class="border-double border-4 border-sky-500">
                                          <button className="border-solid" onClick={handleUploadCLick}>
                                              Submit to the publicly-available dataset
                                          </button>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div className="flex flex-wrap mt-6 relative">
                              <button>
                                  Download our data set
                              </button>
                          </div>
                      </div>
                  </div>
              </div>
          </>
      ) : (
          <>
              <div className="container mx-auto px-4 h-full">
                  <div className="flex content-center items-center justify-center h-full">
                      <div className="w-full lg:w-4/12 px-4">
                          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                  <form>
                                      <div className="relative w-full mb-3">
                                          <label
                                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                              htmlFor="grid-password"
                                          >
                                              Email
                                          </label>
                                          <input
                                              required
                                              type="email"
                                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                              placeholder="Email"
                                              id="email"
                                              value={state.email}
                                              onChange={handleChange}
                                          />
                                      </div>

                                      <div className="relative w-full mb-3">
                                          <label
                                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                              htmlFor="grid-password"
                                          >
                                              Password
                                          </label>
                                          <input
                                              required
                                              id="password"
                                              type="password"
                                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                              placeholder="Password"
                                              value={state.password}
                                              onChange={handleChange}
                                          />
                                      </div>
                                      <div>
                                          <label className="inline-flex items-center cursor-pointer">
                                              <input
                                                  id="customCheckLogin"
                                                  type="checkbox"
                                                  className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                                              />
                                              <span className="ml-2 text-sm font-semibold text-blueGray-600">
                                                Remember me
                                              </span>
                                          </label>
                                      </div>
                                        {showError==null?'':showError}
                                      <div className="text-center mt-6">
                                          <button
                                              className="bg-blueGray-800 active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                              type="submit"
                                              onClick={handleSubmitClick}
                                          >
                                              Sign In
                                          </button>
                                      </div>
                                  </form>
                              </div>
                          </div>
                          <div className="flex flex-wrap mt-6 relative">
                              <div className="w-1/2">
                                  <a
                                      href="#pablo"
                                      onClick={(e) => e.preventDefault()}
                                      className="text-blueGray-200"
                                  >
                                      <small>Forgot password?</small>
                                  </a>
                              </div>
                              <div className="w-1/2 text-right">
                                  <a
                                      href="#pablo"
                                      onClick={(e) => e.preventDefault()}
                                      className="text-blueGray-200"
                                  >
                                      <small>Create New Account</small>
                                  </a>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </>
  );
}

export default App;
