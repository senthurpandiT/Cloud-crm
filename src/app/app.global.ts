import { Injectable } from '@angular/core';

@Injectable()
export class AppGlobals {
  readonly urls: any = {
    SIGNIN: 'business/signup',
    VERIFY_OTP: 'user/verifyemail',
    LOGIN: 'user/login',
    RESET_PASSWORD: 'user/resetpassword',
    FORGOT_PASSWORD: 'user/resetpasswordReq',
    RESET_OTP: 'user/resetotpcheck',
    VIEW_ROLES: 'business/roles-and-privileges?view=role',
    ADD_ROLE: 'business/roles-and-privileges?add=role',
    EDIT_ROLE: 'business/roles-and-privileges?edit=role',
    DELETE_ROLE: 'business/roles-and-prSivileges?delete=role',
    CHANGE_STATUS: 'business/roles-and-privileges?edit=role',
    ROLES_AND_PRIVILEGES: 'business/roles-and-privileges?view=pr',
    EDIT_ROLES_AND_PRIVILEGES: 'business/roles-and-privileges?edit=pr',
    COMPANY_DASH: 'business/partners?view=dash',
    COMPANYPARTNER_LIST: 'business/partners?view',
    ADD_PARTNERSCOMPANY: 'business/partners?add',
    EDT_PARTNERSCOMPANY: 'business/partners?edit',
    DELETE_PARTNERSCOMPANY: 'business/partners?delete',
    CHANGE_STATUS_PARTNERCOMPANY: 'business/partners?edit',
    EMPLOYEE_LIST: 'business/employees?view',
    ADD_EMPLOYEE: 'business/employees?add',
    DELETE_EMPLOYEE: 'business/employees?delete',
    CHANGE_STATUS_EMPLOYEE: 'business/employees?edit',
    LANGUAGE_EMPLOYEE: 'business/employees?view=list',
    GET_EDIT_COMPANY: 'business/partners?edit=get',

    COUNTRY_LIST: 'business/countrylist',
    STATE_LIST: 'business/statelist',
    GET_EDIT_EMPLOYEE: 'business/employees?edit=get',
    EDIT_EMPLOYEE: 'business/employees?edit',
    EMPLOYEE_DASH: 'business/employees?view=dash',
    CUSTOMER_LIST: 'business/customers?view',
    COUNT_LIST: 'business/customers?view=dash',

    ADD_CUSTOMERS: 'business/customers?add',
    UPDATE_CUSTOMERS: '/business/customers?edit',
    GET_CUSTOMER_DETAIL: 'business/customers?edit=get',
    DELETE_CUSTOMER: 'business/customers?delete',
    CHANGE_STATUS_CUSTOMER: 'business/customers?edit',

    ADD_PROJECT: 'business/project-list?add',
    EDIT_PROJECT: 'business/project-list?edit=get',
    DROPDOWN_PROJECT: 'business/project-list?view=list',
    PROJECT_LIST: 'business/project-list?view',
    UPDATE_PROJECT: 'business/project-list?edit=Uonly',
    PROJECT_DELETE: 'business/project-list?delete',
    LANGUAGE_LIST: 'business/languages',
    GET_ONE_LANGUAGE: 'user/language/web',
    UPDATE_PROFILE: 'user/updateprofile',
    EDIT_PROFILE: 'user/editprofile',
    CHANGE_PASSWORD: 'user/resetuserpassword',
    SEARCH_MEMBER: 'business/project-list?view=Userlist',
    REMOVE_MEMBER: 'business/project-list?edit=Removemember',

    //taskpage//
    TASK_ADD: 'business/task?add',
    SINGLE_CHAT: 'chat/singlechat',
    GET_PROJECT_MEMBERS: 'chat/getprojectmembers',
    UPDATE_STORAGE: 'user/loaduser',
    PROJECT_LIST_MEMBER: 'business/project-list?view=Userlist',
    ADD_MEMBER_lIST: 'business/project-list?edit=member',
    MEMBER_LIST: 'business/project-list?view=listmember',
    PROJECT_DETAIL: 'business/project-list?view=ProjectDetails',
    DOWNLOAD_SINGLECHAT_IMAGE: 'chat/downloadchatfile',
    CALENDAR_PLANNING: 'business/calendar-planning?add',
    GET_CHATLIST_BYTYPE: 'chat/getchatlistbytype',
    GET_USER_CHAT: 'chat/getuserchats',
    TASK_PROJECT_LIST: 'business/task?view=Projectlist',
    TASK_ADD_VERIFY: 'business/task?add=verify',
    TASK_USER_LIST: 'business/task?view=Userlist',
    SEARCH_CHAT: 'chat/searchchatusers',
    CREATE_GROUP_CHAT: 'chat/creategroup',
    GROUP_CHAT_API: 'chat/groupchat',
    TASK_TABLE_VIEW: 'business/task?view',
    ADD_CHECKLIST: 'business/task?add=Checklist',
    UPDATE_CHECKLIST: 'business/task?edit=Checklist',
    TASK_DETAILS: 'business/task?view=TaskDetails',
    TASK_EDIT_DETAILS: 'business/task?edit=get',
    TASK_UPDATE: 'business/task?edit=Uonly',
    TASK_VIEW_CHECKLIST: 'business/task?view=Checklist',
    TASK_DELETE_CHECKLIST: '/business/task?delete=Checklist',
    COMMENTS_LIST: 'business/task?view=Comments',
    ADD_COMMENTS: 'business/task?view=Addcomment',
    DOWNLOAD_FILE: 'user/downloadfile',
    GET_FILE: 'user/file/',

    CALENDAR_VIEW_LIST: 'business/calendar-planning?view=list',
    TASK_HISTORY: 'business/task?view=Taskhistory',
    TASK_CHECKBOX: 'business/task?view=ChecklistEdit',
    CHATGROUP_USER_LIST: 'chat/userlist',
    ADD_REMOVE_USERLIST_GROUP: 'chat/addusertogroup',
    REMOVE_USER_GROUP: 'chat/Groupremove',
    CHAT_USER_LIST: 'chat/userlistsearch',
    DELETE_TASK: 'business/task?delete',
    DASHBOARD: 'business/dashboard?view',
    NOTIFICATION: 'business/notification',
    PAYMENT_PLAN_LIST: 'payment/planlist',
    ADMIN_LOGIN: 'admin/login',
    USER_LIST: 'admin/fetchuser',
    BUSINESS_LIST: 'admin/businessaccount',
    EDIT_BUSINESS: 'user/editbusiness',
    UPDATE_BUSINESS: 'user/updatebusiness',
    PLAN_LIST: 'admin/plan',
    ADD_PLAN: 'admin/addplan',
    EDIT_PLAN: 'admin/editplan',
    CHANGE_PLAN_STATUS: 'admin/planstatus',
    UPDATE_PLAN: 'admin/updateplan',
    DASHABORD_COUNT: 'admin/dashborad',
    //project and task page
    FILE_LIST: 'business/listfiles',
    NOTIFICATION_COUNT: 'business/notificationcount',
    MAKE_PAYMENT: 'payment/makepayment',
    PAYMENT_HISTORY: 'payment/paymenthistory',
    GET_BUSINESS: 'user/getbusiness',
    CHAT_SEEN: 'chat/seen',
    EDIT_COMMENTS: 'business/task?view=Editcomment',
    GETUSER_DETAILS: 'user/getuser',
    CHAT_TYPING: 'chat/typing',

    CHECKLIST_ADD: 'business/Checklist',
    //Template checklist
    ADD_CHECK: 'business/Checklistadd',
    CHECKLIST_LIST: 'business/Checklist',
    CHECKLIST_VIEW: 'business/Checklist_View',
    CHECKLIST_UPDATE: 'business/Checklist_update',
    CHECKLIST_DELETE: 'business/Checklist_delete',
    TASK_CHECKLIST_ADD: 'business/Checklist_task',
    TASK_CHECKLIST_DELETE: 'business/Checklist_taskDelete',
    CALENDAR_LEAVE: 'business/calendar-planning?delete',
    CHAT_VALIDATION: 'user/Chatcheck',
    EMPLOYEE_VALIDATION: 'user/Employeecheck',
    PROJECT_VALIDATION: 'user/Projectcheck',
    LEAVE_GROUP: 'chat/exitGroup',
    NOTIFICATION_DELETE: 'business/notificationdelete',

    TASK_LIST_MEMBER: 'business/task?view=Member',
    TASK_REMOVE_MEMBER: 'business/task?edit=removeMember',
    TASK_UPDATE_MEMBER: 'business/task?edit=Member',
    TASK_SEARCH_MEMBER: 'business/task?view=SearchMember',

    CUSTOMER_VIEW: 'business/customers?view=Details',
    CUSTOMER_EDIT_BUSINESS: 'business/customers?edit=business',
    CUSTOMER_CHANGE_STATUS: 'business/customers?edit',
    VIEW_BRANCH_LIST: 'business/project-list?view=Branch',
    RESEND_OTP: 'user/ResentOTP',
    CUSTOMER_SINGLE_UPDATE: 'business/customers?edit=customer',

    //Super admin
    ADMIN_ACTIVE_REJECT: 'admin/Activate',
    ADMIN_BUSINESS_INFO: 'admin/businessinfo',
    LOGIN_AS_CLIENT: 'admin/loginasclient',

    //super admin notification
    SA_NOTIFIACTION: 'admin/Notification',
    SA_NOTIFYCOUNT: 'admin/Notificationcount',
    SA_NOTIFYSEEN: 'admin/Notificationseen',
    BRANCH_DELETE: 'business/customers?delete',
    ACTIVATE_REQUEST: 'user/Activaterequest',
    CHNAGE_STATUS: 'admin/userstatus',

    //Notification settings for Admin
    NOTIFICATION_SETTING: 'user/notificationsetting',
    NOTIFY_SETTING_UPDATE: 'user/notificationsettingupdate',

    DELETE_COMMENT: 'business/task?view=deleteComment',
    TASK_INVITATION: 'business/invitation',
    EDIT_BUSINESS_CUSTOMER: 'business/customers?edit=business',
    ADD_BRANCH_BYID: 'business/customers?add=Branch',
    TASK_BRANCH_LIST: 'business/customers?view=task',
    PROJECT_BRANCH_LIST: 'business/customers?view=project',

    PARTNER_VIEW_EMP: 'business/partners?view=emp',
    PARTNER_PROJECT: 'business/partners?view=project',
    PARTNER_TASK: 'business/partners?view=task',
    // status
    STATUS_VIEW: 'business/status?view',
    STATUS_ADD: 'business/status?add',
    STATUS_EDIT: 'business/status?edit',
    STATUS_UPDATE: 'business/status?edit=status',
    STATUS_DELETE: 'business/status?delete',
    STATUS_LIST: 'business/status?view=list',

    EMP_PROJECTLIST: 'business/employees?view=project',
    EMP_TASKLIST: 'business/employees?view=task',

    // progress
    PROGRESS_VIEW: 'business/progress?view',
    PROGRESS_ADD: 'business/progress?add',
    PROGRESS_EDIT: 'business/progress?edit',
    PROGRESS_DELETE: 'business/progress?delete',
    PROGRESS_LIST: 'business/progress?view=list',

    TASK_KANBAN: 'business/taskkanban/initial',
    PROJECT_UNICONTA: 'business/uniconta/project',
    CLIENT_UNICONTA: 'business/uniconta/client',

    // chat notification count
    CHAT_NOTIFY_COUNT: 'chat/chatnotificationcount',
    CHAT_NOTIFY_LIST: 'chat/chatnotification',

    PROJECT_KANBAN: 'business/projectKanban/initial',
    STATUS_UPDATE_KAN: 'business/projectKanban/Status',
    PROGRESS_UPDATE_KAN: 'business/projectKanban/Progress',
    DRAG_STATUS: 'business/projectKanban/drag/Status',
    DRAG_PROGRESS: 'business/projectKanban/drag/Progress',

    // TASK_KANBAN:'business/taskkanban/initial',

    TASK_DRAG_STATUS: 'business/taskkanban/drag/Status',
    CARD_TASK_DRAG_STATUS: 'business/taskkanban/status',

    PARTNER_NOTE: 'business/partners?edit=note',

    //dropdownlist for customer,branch,user
    CUSTOMER_DROP: 'business/project-list?view=Customer',
    USER_DROP: 'business/project-list?view=allUser',
    TASK_KANBAN_PAGINATION: 'business/taskkanban/pages',
    EDIT_COMPANYLOGO: 'business/partners?edit=updatelogo',
    //pagination   for project-kanban
    PROJECT_KANBAN_PAGI: 'business/projectKanban/pages',
    PROJECT_UPDATE_TARGET: 'business/project-list?edit=date',
    TASK_UPDATE_TARGET: 'business/task?edit=date',

    // Phase 2
    LABEL_ADD: 'business/label?add',
    SET_LABEL: 'business/labelset',
    REMOVE_LABEL: 'business/labelremove',
    LABEL_UPDATE: 'business/label?edit',
    LIST_LABELS: 'business/label?view',
    PROJECT_SET_LABEL: 'business/labelset',

    // Re work customer
    RE_ADD_CUSTOMER: 'business/customers?add=customer',
    RE_EDIT_CUSTOMER: 'business/customers?edit=customer',
    RE_CUSTOMERlIST: 'business/customers?view=customer',
    RE_GET_CUSTOMER: 'business/customers?view=getcustomer',
    RE_CUSTOMER_PROJECTS: 'business/customers?view=customerproject',
    RE_CUSTOMER_TASKS: 'business/customers?view=customertask',
    RE_CUSTOMER_STATUS_UPDATE: 'business/customers?edit=status',
    RE_CUSTOMER_DELETE: 'business/customers?delete=customer',
    RE_CUSTOMER_NOTES: 'business/customers?edit=customernote',

    //delivery Address
    DELIVERY_ADD: 'business/customers?add=deliveryaddress',
    EDIT_DELIVERY: 'business/customers?view=getdeliveryaddress',
    UPDATE_DELIVERY: 'business/customers?edit=deliveryaddress',
    VIEW_DELIVERY: 'business/customers?view=deliveryaddress',
    DELETE_DELIVERY: 'business/customers?delete=deliveryaddress',
    NOTES_DELIVERY: 'business/customers?edit=deliverynote',
    PROJECT_DELIVERY: 'business/customers?view=projectdeliveryaddress',
    TASK_DELIVERY: 'business/customers?view=taskdeliveryaddress',

    //contact person
    ADD_CONTACT: 'business/customers?add=contact_persons',
    EDIT_CONTACT: 'business/customers?view=getcontact_persons',
    UPDATE_CONTACT: 'business/customers?edit=contact_persons',
    VIEW_CONTACT: 'business/customers?view=contact_persons',
    DELETE_CONTACT: 'business/customers?delete=contact_persons',
    CONTACTTYPE_LIST: 'business/contacttype/list',
    NOTES_CONTACT: 'business/customers?edit=contactnote',
    PROJECT_CONTACT: 'business/customers?view=projectcontact_persons',
    TASK_CONTACT: 'business/customers?view=taskcontact_persons',

    // contact type page
    CONTACT_LIST: 'business/status?view=list',
    CONTACT_EDIT: 'business/contacttype/edit',
    CONTACT_DELETE: 'business/contacttype/delete',
    CONTACT_UPDATE: 'business/contacttype/update',
    CONTACT_VIEW: 'business/contacttype/view',
    CONTACT_ADD: 'business/contacttype/add',

    UNICONTA_GET: 'business/ERP/Uniconta/get',
    UNICONTA_ADD: 'business/ERP/Uniconta/add',
    UNICONTA_UPDATE: 'business/ERP/Uniconta/update',
    UNICONTA_DELETE: 'business/ERP/Uniconta/delete',
    //project page new implementation due to customer rework
    CUS_CONTACTS: 'business/project-list?view=Customercontact',
    CUS_DELIVERY: 'business/project-list?view=Customerdelivery',

    // default label delete
    DEL_LABEL: 'business/label?delete',

    //newly add single member  for task and projects
    SINGLE_ADDMEM_TASK: 'business/task?edit=AddMember',
    SINGLE_ADDMEM_PROJ: 'business/project-list?edit=addMember',
    //karthika- status type
    STATUS_TYPE: 'business/status?view=typelist',

    // Phase 3 Implementeation

    // dimension
    ADD_DIMEN: 'business/dimension?add',
    VIEW_DIMEN: 'business/dimension?view',
    UPDATE_DIMEN: 'business/dimension?edit=dimension',
    DELTE_DIMEN: 'business/dimension?delete',
    GET_DIMEN: 'business/dimension?edit',
    VIEW_LIST_DIMEN: 'business/status?view=list',

    //project-case
    ADD_PROJECTCASE: 'business/projectcase?add',
    VIEW_PROJECTCASE: 'business/projectcase?view',
    UPDATE_PROJECTCASE: 'business/projectcase?edit=case',
    DELTE_PROJECTCASE: 'business/projectcase?delete',
    GET_PROJECTCASE: 'business/projectcase?edit',
    VIEW_LIST_PROJECTCASE: 'business/projectcase?view',

    //case list
    CASE_LIST: 'business/case/list',

    // archive api for projects
    ARCH_PROJ_LIST: 'business/project-list?view=Archived',
    ARCH_MOVE_WITHDRAW: 'business/project-list?delete=Archive',

    // project checklist
    PROJ_CHECK_LIST: 'business/project-list?view=Checklist',
    PROJ_CHECK_CHECK: 'business/project-list?view=ChecklistEdit',
    PROJ_CHECK_UPDATE: 'business/project-list?edit=Checklist',
    PROJ_CHECK_DELETE: 'business/project-list?delete=Checklist',

    PROJ_ADDiMPORT: 'business/Checklist_Project',
    PROJ_DELTE_ALLCHECK: 'business/Checklist_ProjectDelete',
    TASK_ADD_PROJECT: 'business/task?add=Checklist',
    PROJECT_ADD_CHECKLIST: 'business/project-list?add=Checklist',

    // project and task update to translate
    PROJECT_uANDt: 'business/project-list?edit=UandT',
    TASK_UANDT: 'business/task?edit=UandT',
  };
}
