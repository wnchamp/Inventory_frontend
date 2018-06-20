import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { EmployeeComponent } from '../EmployeeDD/employee/employee.component';
import { UserComponent } from '../EmployeeDD/user/user.component';
import { DepartmentComponent } from '../EmployeeDD/department/department.component';
import { StockComponent } from '../StockDD/stock/stock.component';
import { CategoryComponent } from '../StockDD/Management/category/category.component';
import { BrandComponent } from '../StockDD/Management/brand/brand.component';
import { HomeComponent } from './home.component';
import { ListBorrowComponent } from '../menu/userpanel/list-borrow/list-borrow.component';
import { AboutUserComponent } from '../menu/userpanel/about-user/about-user.component';
import { SuperadminGuard } from './superadmin.guard';
import { UserGuard } from './user.guard';
import { AdminGuard } from './admin.guard';
import { AuthGuard } from '../auth.guard';
import { TypecomComponent } from '../StockDD/Management/typecom/typecom.component';
import { DefectComponent } from '../DefectDD/defect/defect.component';
import { RepairComponent } from '../DefectDD/repair/repair.component';
import { GarbageEmpComponent } from '../GarbageDD/garbage-emp/garbage-emp.component';
import { GarbageDepartmentComponent } from '../GarbageDD/garbage-department/garbage-department.component';
import { GarbageStockComponent } from '../GarbageDD/garbage-stock/garbage-stock.component';
import { GarbageCategoryComponent } from '../GarbageDD/garbage-category/garbage-category.component';
import { GarbageTypeComponent } from '../GarbageDD/garbage-type/garbage-type.component';
import { GarbageBrandComponent } from '../GarbageDD/garbage-brand/garbage-brand.component';
import { ConnTypebrandComponent } from '../StockDD/Management/conn-typebrand/conn-typebrand.component';
import { ReceivedComponent } from '../DefectDD/received/received.component';
import { BorrowComponent } from '../BorrowDD/borrow/borrow.component';
import { BorrowEmployeeComponent } from '../BorrowDD/borrow-employee/borrow-employee.component';
import { RequestforPurchseComponent } from '../Purchase/requestfor-purchse/requestfor-purchse.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', canActivate: [AdminGuard, AuthGuard], component: DashboardComponent },
      { path: 'dashboard', canActivate: [AdminGuard, AuthGuard], component: DashboardComponent },
      { path: 'employee', canActivate: [SuperadminGuard, AuthGuard], component: EmployeeComponent },
      { path: 'user', canActivate: [SuperadminGuard, AuthGuard], component: UserComponent },
      { path: 'department', canActivate: [SuperadminGuard, AuthGuard], component: DepartmentComponent },

      { path: 'garbage-employee', canActivate: [AdminGuard, AuthGuard], component: GarbageEmpComponent },
      { path: 'garbage-department', canActivate: [AdminGuard, AuthGuard], component: GarbageDepartmentComponent },
      { path: 'garbage-stock', canActivate: [AdminGuard, AuthGuard], component: GarbageStockComponent },
      { path: 'garbage-category', canActivate: [AdminGuard, AuthGuard], component: GarbageCategoryComponent },
      { path: 'garbage-type', canActivate: [AdminGuard, AuthGuard], component: GarbageTypeComponent },
      { path: 'garbage-brand', canActivate: [AdminGuard, AuthGuard], component: GarbageBrandComponent },

      { path: 'stock', canActivate: [AdminGuard, AuthGuard], component: StockComponent },
      { path: 'category', canActivate: [AdminGuard, AuthGuard], component: CategoryComponent },
      { path: 'type', canActivate: [AdminGuard, AuthGuard], component: TypecomComponent },
      { path: 'brand', canActivate: [AdminGuard, AuthGuard], component: BrandComponent },
      { path: 'conn-typebrand', canActivate: [AdminGuard, AuthGuard], component: ConnTypebrandComponent },
      { path: 'borrowadmin', canActivate: [AdminGuard, AuthGuard], component: BorrowComponent },
      { path: 'borrow-employeeadmin', canActivate: [AdminGuard, AuthGuard], component: BorrowEmployeeComponent },
      { path: 'defect', canActivate: [AdminGuard, AuthGuard], component: DefectComponent },
      { path: 'repair', canActivate: [AdminGuard, AuthGuard], component: RepairComponent },
      { path: 'receive', canActivate: [AdminGuard, AuthGuard], component: ReceivedComponent },
      { path: 'requestforpurchase', canActivate: [AdminGuard, AuthGuard], component: RequestforPurchseComponent },

      { path: 'borrow', canActivate: [UserGuard, AuthGuard], component: ListBorrowComponent },
      { path: 'about', canActivate: [UserGuard, AuthGuard], component: AboutUserComponent },
      { path: 'setting', canActivate: [AuthGuard], loadChildren: 'app/setting/setting.module#SettingModule' }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
