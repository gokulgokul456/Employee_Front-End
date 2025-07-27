import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import AdminPage from './pages/AdminPage/AdminPage';
import PrivateRoutes from './utils/PrivateRoutes';
import RoleBaseRoutes from './utils/RoleBaseRoutes';
import AdminSummary from './components/AdminSummary/AdminSummary';
import Departments from './components/Departments/Departments';
import Employees from './components/Employees/Employees';
import AddDepartment from './components/Departments/AddDepartment';
import EditDepartment from './components/Departments/EditDepartment';
import AddEmployess from './components/Employees/AddEmployees'
import ViewEmployee from './components/Employees/ViewEmployee';
import EditEmployee from './components/Employees/EditEmployee';
import AddSalary from './components/Salary/AddSalary';
import ViewSalary from './components/Employees/ViewSalary';
import EmployeePage from './pages/EmployeePage/EmployeePage';
import EmployeeSummary from './components/EmployeeSummary/EmployeeSummary';
import EmployeeLeaves from './components/EmployeeLeaves/EmployeeLeaves';
import AddLeaves from './components/EmployeeLeaves/AddLeaves';
import SettingsEmployee from './components/SettingsEmployee/SettingsEmployee';
import AdminLeave from './components/AdminLeave/AdminLeave';
import AdminViewLeave from './components/AdminLeave/AdminViewLeave';
import AdminLeavehistory from './components/AdminLeave/AdminLeavehistory';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["admin"]}>
                <AdminPage />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<AdminSummary />} />
          <Route path="employees" element={<Employees />} />
          <Route path="departments" element={<Departments />} />
          <Route path="add-department" element={<AddDepartment />} />
          <Route path="add-employee" element={<AddEmployess/>} />
          <Route path="employees/:id" element={<ViewEmployee/>} />
          <Route path="employees/edit/:id" element={<EditEmployee/>} />
          <Route path="employees/salary/:id" element={<ViewSalary/>} />
          <Route path="salary/add" element={<AddSalary/>} />
          <Route path="department/:id" element={<EditDepartment/>} />
          <Route path="adminleaves" element={<AdminLeave/>} />
          <Route path="/admin/adminleaves/:id" element={<AdminViewLeave/>} />
          <Route path="/admin/employees/leaves/:id" element={<AdminLeavehistory/>} />
          <Route path="/admin/settings" element={<SettingsEmployee/>} />
        </Route>
        <Route path="/employee" element={
          <PrivateRoutes>
          <RoleBaseRoutes requiredRole={["admin", "employee"]}>
          <EmployeePage/>
          </RoleBaseRoutes>
          </PrivateRoutes>
          } >
          <Route index element={<EmployeeSummary />} />
          <Route path='profile/:id' element={<ViewEmployee/>}></Route>
          <Route path='leaves/:id' element={<EmployeeLeaves/>}></Route>
          <Route path='leaves/:id/apply-leave' element={<AddLeaves/>}></Route>
          <Route path='salary/:id' element={<ViewSalary/>}></Route>
          <Route path='settings' element={<SettingsEmployee/>}></Route>
       </Route>
      </Routes>
    </Router>
  );
}

export default App;
