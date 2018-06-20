import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxBarcodeModule } from 'ngx-barcode';
import { HomeRoutingModule } from './home-routing.module';
import { ChartsModule } from 'ng2-charts';

import { HomeComponent } from './home.component';
import { MenuComponent } from '../menu/menu.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { UserComponent } from '../EmployeeDD/user/user.component';
import { EmployeeComponent } from '../EmployeeDD/employee/employee.component';
import { DepartmentComponent } from '../EmployeeDD/department/department.component';

import { StockComponent } from '../StockDD/stock/stock.component';
import { CategoryComponent } from '../StockDD/Management/category/category.component';
import { BrandComponent } from '../StockDD/Management/brand/brand.component';
import { SpadminpanelComponent } from '../menu/spadminpanel/spadminpanel.component';
import { MenuUserpanelComponent } from '../menu/userpanel/menu-userpanel.component';
import { MenuAdminpanelComponent } from '../menu/adminpanel/menu-adminpanel.component';
import { ListBorrowComponent } from '../menu/userpanel/list-borrow/list-borrow.component';
import { AboutUserComponent } from '../menu/userpanel/about-user/about-user.component';
import { ModalCreatedepartmentComponent } from '../EmployeeDD/department/modal-createdepartment/modal-createdepartment.component';
import { ModalEditdepartmentComponent } from '../EmployeeDD/department/modal-editdepartment/modal-editdepartment.component';
import { ModalDeletedepartmentComponent } from '../EmployeeDD/department/modal-deletedepartment/modal-deletedepartment.component';
import { ModalCreateemployeeComponent } from '../EmployeeDD/employee/modal-createemployee/modal-createemployee.component';
import { ModalEditemployeeComponent } from '../EmployeeDD/employee/modal-editemployee/modal-editemployee.component';
import { ModalDeleteemployeeComponent } from '../EmployeeDD/employee/modal-deleteemployee/modal-deleteemployee.component';
import { ModalDetailuserComponent } from '../EmployeeDD/user/modal-detailuser/modal-detailuser.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ModalChangeuserComponent } from '../menu/userpanel/about-user/modal-changeuser/modal-changeuser.component';
import { ModalChangepassComponent } from '../menu/userpanel/about-user/modal-changepass/modal-changepass.component';
import { ModalEdituserComponent } from '../EmployeeDD/user/modal-edituser/modal-edituser.component';
import { DashboardAdminComponent } from '../menu/adminpanel/dashboard-admin/dashboard-admin.component';

import { SuperadminGuard } from './superadmin.guard';
import { UserGuard } from './user.guard';
import { AdminGuard } from './admin.guard';

import { ModalDelStockComponent } from '../StockDD/stock/modal-del-stock/modal-del-stock.component';
import { ModalEditStockComponent } from '../StockDD/stock/modal-edit-stock/modal-edit-stock.component';
import { ModalCreateStockComponent } from '../StockDD/stock/modal-create-stock/modal-create-stock.component';

import { ModalEditpassComponent } from '../EmployeeDD/user/modal-editpass/modal-editpass.component';

import { BrandCreateModalComponent } from '../StockDD/Management/brand/brand-createModal/brand-createModal.component';
import { BrandEditModalComponent } from '../StockDD/Management/brand/brand-editModal/brand-editModal.component';
import { BrandDeleteModalComponent } from '../StockDD/Management/brand/brand-deleteModal/brand-deleteModal.component';
import { CateCreateModalComponent } from '../StockDD/Management/category/cate-createModal/cate-createModal.component';
import { CateEditModalComponent } from '../StockDD/Management/category/cate-editModal/cate-editModal.component';
import { CateDeleteModalComponent } from '../StockDD/Management/category/cate-deleteModal/cate-deleteModal.component';

import { AuthenticationService } from '../authentication.service';
import { SettokenService } from '../settoken.service';

import { TypedeletemodalComponent } from '../StockDD/Management/typecom/typedeletemodal/typedeletemodal.component';
import { TypeeditmodalComponent } from '../StockDD/Management/typecom/typeeditmodal/typeeditmodal.component';
import { TypecreatemodalComponent } from '../StockDD/Management/typecom/typecreatemodal/typecreatemodal.component';
import { TypecomComponent } from '../StockDD/Management/typecom/typecom.component';
import { ModalBorrowStockComponent } from '../StockDD/stock/modal-borrow-stock/modal-borrow-stock.component';
import { DefectComponent } from '../DefectDD/defect/defect.component';
import { RepairComponent } from '../DefectDD/repair/repair.component';

import { NavbarComponent } from '../navbar/navbar.component';

import { ModaleditdefectComponent } from '../DefectDD/defect/modaleditdefect/modaleditdefect.component';
import { ModalDefectStockComponent } from '../StockDD/stock/modal-defect-stock/modal-defect-stock.component';
import { GarbageEmpComponent } from '../GarbageDD/garbage-emp/garbage-emp.component';
import { ModalViewBarcodeComponent } from '../StockDD/stock/modal-view-barcode/modal-view-barcode.component';
import { ModalUnblockuserComponent } from '../EmployeeDD/user/modal-unblockuser/modal-unblockuser.component';
import { ModalBlockuserComponent } from '../EmployeeDD/user/modal-blockuser/modal-blockuser.component';
import { ReturnModalComponent } from '../StockDD/stock/return-modal/return-modal.component';
import { GarbageDepartmentComponent } from '../GarbageDD/garbage-department/garbage-department.component';
import { GarbageStockComponent } from '../GarbageDD/garbage-stock/garbage-stock.component';
import { GarbageCategoryComponent } from '../GarbageDD/garbage-category/garbage-category.component';
import { GarbageTypeComponent } from '../GarbageDD/garbage-type/garbage-type.component';
import { GarbageBrandComponent } from '../GarbageDD/garbage-brand/garbage-brand.component';
import { ConnTypebrandComponent } from '../StockDD/Management/conn-typebrand/conn-typebrand.component';
import { ConnTbmodalcreateComponent } from '../StockDD/Management/conn-typebrand/conn-tbmodalcreate/conn-tbmodalcreate.component';
import { ConnTbmodaldeleteComponent } from '../StockDD/Management/conn-typebrand/conn-tbmodaldelete/conn-tbmodaldelete.component';
import { GarbageDepmodalmoveComponent } from '../GarbageDD/garbage-department/garbage-depmodalmove/garbage-depmodalmove.component';
import { ConfirmModalComponent } from '../GarbageDD/garbage-stock/confirm-modal/confirm-modal.component';
import { GarbageBrandmodalmoveComponent } from '../GarbageDD/garbage-brand/garbage-brandmodalmove/garbage-brandmodalmove.component';
// tslint:disable-next-line:max-line-length
import { GarbageCategorymodalmoveComponent } from '../GarbageDD/garbage-category/garbage-categorymodalmove/garbage-categorymodalmove.component';
import { GarbageTypemodalmoveComponent } from '../GarbageDD/garbage-type/garbage-typemodalmove/garbage-typemodalmove.component';
import { ModalStockDetailComponent } from '../StockDD/stock/modal-stock-detail/modal-stock-detail.component';
import { GarbageEmpmodalmoveComponent } from '../GarbageDD/garbage-emp/garbage-empmodalmove/garbage-empmodalmove.component';
import { ModalCreateRepairComponent } from '../DefectDD/defect/modal-create-repair/modal-create-repair.component';
import { FormatBarcodeService } from '../formatBarcode.service';
import { ModaldefectMultirepairComponent } from '../DefectDD/defect/modaldefect-multirepair/modaldefect-multirepair.component';
import { ModalRepairDetailComponent } from '../DefectDD/repair/modal-repair-detail/modal-repair-detail.component';
import { ReceivedComponent } from '../DefectDD/received/received.component';
import { ModalrepairMultireceiveComponent } from '../DefectDD/repair/modalrepair-multireceive/modalrepair-multireceive.component';
import { ModalSelectborrowComponent } from '../StockDD/stock/modal-selectborrow/modal-selectborrow.component';
import { ModalSelectreturnComponent } from '../StockDD/stock/modal-selectreturn/modal-selectreturn.component';
import { ModalSelectdefectComponent } from '../StockDD/stock/modal-selectdefect/modal-selectdefect.component';
import { ModalDetailReceiveComponent } from '../DefectDD/received/modal-detail-receive/modal-detail-receive.component';
import { ModaldefectShowdetailComponent } from '../DefectDD/defect/modaldefect-showdetail/modaldefect-showdetail.component';
import { ModalrepairEditComponent } from '../DefectDD/repair/modalrepair-edit/modalrepair-edit.component';
import { ModalBorrowDetailComponent } from '../StockDD/stock/modal-borrow-stock/modal-borrow-detail/modal-borrow-detail.component';
import { ModalDetailReturnComponent } from '../StockDD/stock/return-modal/modal-detail-return/modal-detail-return.component';
// tslint:disable-next-line:max-line-length
import { ModalDefectModaldefectComponent } from '../StockDD/stock/modal-defect-stock/modal-defect-detail/modal-defect-modaldefect.component';
// tslint:disable-next-line:max-line-length
import { MatTableModule, MatSortModule, MatFormFieldModule, MatSelectModule, MatIcon, MatIconModule, MatAutocompleteModule, MatInputModule, MatMenuModule, MatButtonModule, MatListModule, MatSnackBar, MatSnackBarModule, MatPaginatorModule } from '@angular/material';
// tslint:disable-next-line:max-line-length
import { ModalDefectAdddescriptionComponent } from '../StockDD/stock/modal-defect-stock/modal-defect-adddescription/modal-defect-adddescription.component';
import { ModalStockViewborrowComponent } from '../StockDD/stock/modal-stock-viewborrow/modal-stock-viewborrow.component';
import { ModalDetailemployeeComponent } from '../EmployeeDD/employee/modal-detailemployee/modal-detailemployee.component';
import { ModalrepairSelectreceiveComponent } from '../DefectDD/repair/modalrepair-selectreceive/modalrepair-selectreceive.component';
// tslint:disable-next-line:max-line-length
import { ModaldefectMultirepairAdddescriptionComponent } from '../DefectDD/defect/modaldefect-multirepair/modaldefect-multirepair-adddescription/modaldefect-multirepair-adddescription.component';
// tslint:disable-next-line:max-line-length
import { MultiRepairDetailModalComponent } from '../DefectDD/defect/modaldefect-multirepair/multi-repair-detail-modal/multi-repair-detail-modal.component';
// tslint:disable-next-line:max-line-length
import { MultiReceiveDetailModalComponent } from '../DefectDD/repair/modalrepair-multireceive/multi-receive-detail-modal/multi-receive-detail-modal.component';
import { BorrowComponent } from '../BorrowDD/borrow/borrow.component';
import { ModalDetailComponent } from '../BorrowDD/borrow/modal-detail/modal-detail.component';
import { BorrowEmployeeComponent } from '../BorrowDD/borrow-employee/borrow-employee.component';
import { BorrowempModaldetailComponent } from '../BorrowDD/borrow-employee/borrowemp-modaldetail/borrowemp-modaldetail.component';
// tslint:disable-next-line:max-line-length
import { BorrowempModaldetailDetailComponent } from '../BorrowDD/borrow-employee/borrowemp-modaldetail/borrowemp--modaldetail-detail/borrowemp--modaldetail-detail.component';
import { ModalrecylebinDeleteComponent } from '../GarbageDD/garbage-stock/modalrecylebin-delete/modalrecylebin-delete.component';
// tslint:disable-next-line:max-line-length
import { ModalbincateModaldeleteComponent } from '../GarbageDD/garbage-category/modalbincate-modaldelete/modalbincate-modaldelete.component';
import { BrandbinModaldeleteComponent } from '../GarbageDD/garbage-brand/brandbin-modaldelete/brandbin-modaldelete.component';
import { BintypeModaldeleteComponent } from '../GarbageDD/garbage-type/bintype-modaldelete/bintype-modaldelete.component';
// tslint:disable-next-line:max-line-length
import { BorrowempModalreturnComponent } from '../BorrowDD/borrow-employee/borrowemp-modaldetail/borrowemp-modalreturn/borrowemp-modalreturn.component';

import { BarcodePipe } from '../barcode.pipe';

import { BinempModaldeleteComponent } from '../GarbageDD/garbage-emp/binemp-modaldelete/binemp-modaldelete.component';
import { BindepModaldeleteComponent } from '../GarbageDD/garbage-department/bindep-modaldelete/bindep-modaldelete.component';
import { BorrowModalConfirmReturnComponent } from '../BorrowDD/borrow/borrow-modal-confirm-return/borrow-modal-confirm-return.component';

import { RequestforPurchseComponent } from '../Purchase/requestfor-purchse/requestfor-purchse.component';
import { RfpModalrfpcreateComponent } from '../Purchase/requestfor-purchse/rfp-modalrfpcreate/rfp-modalrfpcreate.component';
import { RfpModalrfpdeatailsComponent } from '../Purchase/requestfor-purchse/rfp-modalrfpdeatails/rfp-modalrfpdeatails.component';
import { RfpModalrfpeditComponent } from '../Purchase/requestfor-purchse/rfp-modalrfpedit/rfp-modalrfpedit.component';
import { RfpModalrfpstatusComponent } from '../Purchase/requestfor-purchse/rfp-modalrfpstatus/rfp-modalrfpstatus.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgxBarcodeModule,
    ChartsModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatPaginatorModule
  ],
  declarations: [
    BarcodePipe,
    NavbarComponent,
    HomeComponent,
    MenuComponent,
    DashboardComponent,
    EmployeeComponent,
    UserComponent,
    DepartmentComponent,

    StockComponent,
    CategoryComponent,
    BrandComponent,
    SpadminpanelComponent,
    MenuUserpanelComponent,
    ListBorrowComponent,
    AboutUserComponent,
    MenuAdminpanelComponent,
    MenuAdminpanelComponent,
    DashboardAdminComponent,
    TypecomComponent,
    RequestforPurchseComponent,

    ModalCreatedepartmentComponent,
    ModalEditdepartmentComponent,
    ModalDeletedepartmentComponent,

    ModalCreateemployeeComponent,
    ModalEditemployeeComponent,
    ModalDetailemployeeComponent,
    ModalDeleteemployeeComponent,

    ModalChangeuserComponent,
    ModalChangepassComponent,
    ModalEdituserComponent,
    ModalBlockuserComponent,
    ModalUnblockuserComponent,

    ModalCreateStockComponent,
    ModalEditStockComponent,
    ModalDelStockComponent,
    ModalBorrowStockComponent,

    ModalEditpassComponent,

    BrandCreateModalComponent,
    BrandEditModalComponent,
    BrandDeleteModalComponent,

    CateCreateModalComponent,
    CateEditModalComponent,
    CateDeleteModalComponent,

    TypecreatemodalComponent,
    TypeeditmodalComponent,
    TypedeletemodalComponent,

    ConnTypebrandComponent,
    ConnTbmodalcreateComponent,
    ConnTbmodaldeleteComponent,

    BorrowComponent,
    BorrowEmployeeComponent,
    DefectComponent,
    RepairComponent,
    ReceivedComponent,

    ModaleditdefectComponent,
    ModaldefectShowdetailComponent,

    ModalCreateRepairComponent,

    ModalDetailComponent,
    BorrowempModaldetailComponent,
    BorrowempModaldetailDetailComponent,
    BorrowempModalreturnComponent,

    ModaldefectMultirepairComponent,
    ModaldefectMultirepairAdddescriptionComponent,
    ModalrepairMultireceiveComponent,
    ModalrepairEditComponent,
    ModalrepairSelectreceiveComponent,

    ModalDefectStockComponent,
    ModalDefectModaldefectComponent,
    ModalDefectAdddescriptionComponent,

    GarbageEmpComponent,
    GarbageDepartmentComponent,
    GarbageStockComponent,
    GarbageCategoryComponent,
    GarbageTypeComponent,
    GarbageBrandComponent,

    ModalrecylebinDeleteComponent,
    ModalbincateModaldeleteComponent,
    BrandbinModaldeleteComponent,
    BintypeModaldeleteComponent,
    BinempModaldeleteComponent,
    BindepModaldeleteComponent,

    GarbageDepmodalmoveComponent,
    GarbageBrandmodalmoveComponent,
    GarbageCategorymodalmoveComponent,
    GarbageTypemodalmoveComponent,
    GarbageEmpmodalmoveComponent,

    ModalViewBarcodeComponent,
    ReturnModalComponent,
    ConfirmModalComponent,
    ModalStockDetailComponent,
    ModalSelectborrowComponent,
    ModalSelectreturnComponent,
    ModalSelectdefectComponent,
    ModalStockViewborrowComponent,

    ModalRepairDetailComponent,

    ModalDetailReceiveComponent,
    ModalBorrowDetailComponent,
    ModalDetailReturnComponent,

    MultiRepairDetailModalComponent,
    MultiReceiveDetailModalComponent,
    ModalDefectModaldefectComponent,

    BorrowModalConfirmReturnComponent,
    ModalDetailuserComponent,

    RfpModalrfpcreateComponent,
    RfpModalrfpdeatailsComponent,
    RfpModalrfpeditComponent,
    RfpModalrfpstatusComponent,
  ],
  providers: [SuperadminGuard, UserGuard, AdminGuard, AuthenticationService, SettokenService, FormatBarcodeService]
})
export class HomeModule { }
