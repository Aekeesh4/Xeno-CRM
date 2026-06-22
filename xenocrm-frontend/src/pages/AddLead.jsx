import { useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddLead() {

  const user =
    JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "ADMIN") {

    return <Navigate to="/" />;

  }


  const [loading, setLoading] = useState(false);


  const [lead, setLead] = useState({

    customerName: "",

    email: "",

    phone: "",

    company: "",

    source: "",

    assignedTo: "",

    status: "NEW",

    notes: "",

  });



  const handleChange = (e) => {

    setLead({

      ...lead,

      [e.target.name]: e.target.value,

    });

  };



  const saveLead = async (e) => {

    e.preventDefault();


    setLoading(true);


    try {

      const response = await fetch(

        "https://xeno-crm-production-1dfc.up.railway.app/api/lead/add",

        {

          method: "POST",

          headers: {

            "Content-Type": "application/json",

          },

          body: JSON.stringify(lead),

        }

      );



      if (response.ok) {

        toast.success(

          "Lead Added Successfully"

        );


        setLead({

          customerName: "",

          email: "",

          phone: "",

          company: "",

          source: "",

          assignedTo: "",

          status: "NEW",

          notes: "",

        });

      }

      else {

        toast.error(

          "Failed To Add Lead"

        );

      }

    }

    catch (error) {

      console.log(error);


      toast.error(

        "Server Error"

      );

    }

    finally {

      setLoading(false);

    }

  };



  return (

    <div className="container mt-5">

      <div
        className="card border-0 shadow-lg"
        style={{
          maxWidth: "900px",
          margin: "auto",
          background: "#1e293b",
          borderRadius: "20px",
          color: "white",
        }}
      >

        <div className="card-body p-5">

          <h1 className="fw-bold mb-4 text-center">

            Add New Lead

          </h1>


          <form onSubmit={saveLead}>


            <div className="row">

              <div className="col-md-6 mb-4">

                <input

                  className="form-control"

                  type="text"

                  name="customerName"

                  placeholder="Enter Customer Name"

                  value={lead.customerName}

                  onChange={handleChange}

                  required

                />

              </div>



              <div className="col-md-6 mb-4">

                <input

                  className="form-control"

                  type="email"

                  name="email"

                  placeholder="Enter Email Address"

                  value={lead.email}

                  onChange={handleChange}

                  required

                />

              </div>




              <div className="col-md-6 mb-4">

                <input

                  className="form-control"

                  type="text"

                  name="phone"

                  placeholder="Enter Phone Number"

                  value={lead.phone}

                  onChange={handleChange}

                  required

                />

              </div>




              <div className="col-md-6 mb-4">

                <input

                  className="form-control"

                  type="text"

                  name="company"

                  placeholder="Enter Company Name"

                  value={lead.company}

                  onChange={handleChange}

                />

              </div>





              <div className="col-md-6 mb-4">

                <input

                  className="form-control"

                  type="text"

                  name="source"

                  placeholder="Lead Source (Website, LinkedIn, Referral)"

                  value={lead.source}

                  onChange={handleChange}

                />

              </div>





              <div className="col-md-6 mb-4">

                <input

                  className="form-control"

                  type="text"

                  name="assignedTo"

                  placeholder="Assign To"

                  value={lead.assignedTo}

                  onChange={handleChange}

                />

              </div>





              <div className="col-12 mb-4">

                <textarea

                  className="form-control"

                  rows="5"

                  name="notes"

                  placeholder="Write additional notes here..."

                  value={lead.notes}

                  onChange={handleChange}

                />

              </div>


            </div>




            <button

              className="btn btn-primary w-100 py-3 fw-bold"

              type="submit"

              disabled={loading}

            >

              {

                loading

                  ?

                "Saving Lead..."

                  :

                "Add Lead"

              }

            </button>


          </form>

        </div>

      </div>

    </div>

  );

}

export default AddLead;