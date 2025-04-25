import { useState } from "react";
import Pagination from "./Pagination";

const employees = [
  { id: 1, firstName: "John", lastName: "Doe" },
  { id: 2, firstName: "Jane", lastName: "Smith" },
  { id: 3, firstName: "Michael", lastName: "Johnson" },
  { id: 4, firstName: "Emily", lastName: "Davis" },
  { id: 5, firstName: "David", lastName: "Miller" },
  { id: 6, firstName: "Sarah", lastName: "Brown" },
  { id: 7, firstName: "Robert", lastName: "Wilson" },
  { id: 8, firstName: "Linda", lastName: "Moore" },
  { id: 9, firstName: "James", lastName: "Taylor" },
  { id: 10, firstName: "Patricia", lastName: "Anderson" },
  { id: 11, firstName: "Charles", lastName: "Thomas" },
  { id: 12, firstName: "Barbara", lastName: "Jackson" },
  { id: 13, firstName: "Christopher", lastName: "White" },
  { id: 14, firstName: "Jessica", lastName: "Harris" },
  { id: 15, firstName: "Daniel", lastName: "Martin" },
  { id: 16, firstName: "Karen", lastName: "Thompson" },
  { id: 17, firstName: "Matthew", lastName: "Garcia" },
  { id: 18, firstName: "Nancy", lastName: "Martinez" },
  { id: 19, firstName: "Joshua", lastName: "Robinson" },
  { id: 20, firstName: "Betty", lastName: "Clark" },
  { id: 21, firstName: "Steven", lastName: "Rodriguez" },
  { id: 22, firstName: "Donna", lastName: "Lewis" },
  { id: 23, firstName: "Andrew", lastName: "Lee" },
  { id: 24, firstName: "Margaret", lastName: "Walker" },
  { id: 25, firstName: "Brian", lastName: "Hall" },
  { id: 26, firstName: "Lisa", lastName: "Allen" },
  { id: 27, firstName: "Kevin", lastName: "Young" },
  { id: 28, firstName: "Sandra", lastName: "King" },
  { id: 29, firstName: "Mark", lastName: "Wright" },
  { id: 30, firstName: "Ashley", lastName: "Lopez" },
];

export default function Employees() {
  const [page, setPage] = useState(1);
  return (
    <div>
      <h1>Employees</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {employees
            .slice((page - 1) * 5, (page - 1) * 5 + 5)
            .map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <Pagination
        initialPage={page}
        onPageChange={(page) => setPage(page)}
        totalPages={Math.ceil(employees.length / 5)}
      />
    </div>
  );
}
