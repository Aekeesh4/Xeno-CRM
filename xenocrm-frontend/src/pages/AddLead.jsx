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

        "http://localhost:8081/api/lead/add",

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

    <div className="container mt-4">

      <div className="card shadow-lg border-0">

        <div className="card-body p-5">

          <h2 className="fw-bold mb-4">

            Add New Lead

          </h2>



          <form onSubmit={saveLead}>


            <div className="row">

              <div className="col-md-6 mb-3">

                <input

                  className="form-control"

                  type="text"

                  name="customerName"

                  placeholder="Customer Name"

                  value={lead.customerName}

                  onChange={handleChange}

                  required

                />

              </div>


              <div className="col-md-6 mb-3">

                <input

                  className="form-control"

                  type="email"

                  name="email"

                  placeholder="Email"

                  value={lead.email}

                  onChange={handleChange}

                  required

                />

              </div>


              <div className="col-md-6 mb-3">

                <input

                  className="form-control"

                  type="text"

                  name="phone"

                  placeholder="Phone"

                  value={lead.phone}

                  onChange={handleChange}

                  required

                />

              </div>



              <div className="col-md-6 mb-3">

                <input

                  className="form-control"

                  type="text"

                  name="company"

                  placeholder="Company"

                  value={lead.company}

                  onChange={handleChange}

                />

              </div>



              <div className="col-md-6 mb-3">

                <input

                  className="form-control"

                  type="text"

                  name="source"

                  placeholder="Lead Source"

                  value={lead.source}

                  onChange={handleChange}

                />

              </div>



              <div className="col-md-6 mb-3">

                <input

                  className="form-control"

                  type="text"

                  name="assignedTo"

                  placeholder="Assigned To"

                  value={lead.assignedTo}

                  onChange={handleChange}

                />

              </div>


              <div className="col-12 mb-3">

                <textarea

                  className="form-control"

                  rows="4"

                  name="notes"

                  placeholder="Notes"

                  value={lead.notes}

                  onChange={handleChange}

                />

              </div>

            </div>



            <button

              className="btn btn-primary px-4"

              type="submit"

              disabled={loading}

            >

              {

                loading

                ?

                "Saving..."

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