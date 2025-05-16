import React from "react";

interface Project {
  projectId: string;
  role: string;
}

interface Employee {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  projectRole: string;
  projects: Project[];
  createdAt: string;
}

type Props = {
  employee: Employee;
};

const EmployeeCard: React.FC<Props> = ({ employee }) => {
  return (
    <div className="max-w-2xl w-full">
      <div className="space-y-6">
        <div key={employee._id} className="bg-white border rounded-xl p-6">
          {/* Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base text-gray-700">
            <div>
              <p className="text-gray-500 font-medium text-sm">First Name</p>
              <p>{employee.firstName}</p>
            </div>
            <div>
              <p className="text-gray-500 font-medium text-sm">Last Name</p>
              <p>{employee.lastName}</p>
            </div>
            <div>
              <p className="text-gray-500 font-medium text-sm">Email</p>
              <p>{employee.email}</p>
            </div>
            <div>
              <p className="text-gray-500 font-medium text-sm">Project Role</p>
              <p className="text-blue-600 font-medium">
                {employee.projectRole}
              </p>
            </div>
            {/* <div>
              <p className="text-gray-500 font-medium text-sm">Joined</p>
              <p>{new Date(employee.createdAt).toLocaleDateString()}</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
