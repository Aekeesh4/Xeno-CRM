import { useEffect, useState } from "react";

function Profile() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [totalCustomers, setTotalCustomers] = useState(0);

  const [totalLeads, setTotalLeads] = useState(0);


  useEffect(() => {

    fetch("http://localhost:8081/api/dashboard/total-customers")

      .then(res => res.json())

      .then(data => setTotalCustomers(data));



    fetch("http://localhost:8081/api/dashboard/total-leads")

      .then(res => res.json())

      .then(data => setTotalLeads(data));

  }, []);



  return (

    <div className="container mt-5">

      <div className="card shadow border-0 p-5">

        <div className="text-center mb-5">

          <h1 className="fw-bold">

            My Profile

          </h1>

        </div>


        <div className="row">

          <div className="col-md-6">

            <h5>Name</h5>

            <p>{user?.name}</p>

          </div>



          <div className="col-md-6">

            <h5>Email</h5>

            <p>{user?.email}</p>

          </div>



          <div className="col-md-6">

            <h5>Role</h5>

            <p>{user?.role}</p>

          </div>



          <div className="col-md-6">

            <h5>Joined</h5>

            <p>

              {new Date().toDateString()}

            </p>

          </div>

        </div>



        <hr />



        <div className="row text-center mt-4">

          <div className="col-md-6">

            <div className="card p-4 shadow">

              <h5>Total Customers</h5>

              <h1>{totalCustomers}</h1>

            </div>

          </div>



          <div className="col-md-6">

            <div className="card p-4 shadow">

              <h5>Total Leads</h5>

              <h1>{totalLeads}</h1>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Profile;