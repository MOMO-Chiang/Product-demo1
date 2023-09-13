# IntelligenceOfillegal 不法情資系統建立新頁面

## 前端

### 1.建立 權限 Model

src => shared => enums => AdminPermission 中新增頁面名稱(命名須與後端 Model 相同)

### 2.建立 Approute

src => app => route-path => 加入該頁面路徑
src => app => AppRouter => 加入該頁面權限&要顯示的 page
src => app => sidebar-menu-config => 加入該頁面權限&要顯示的 page

### 3.建立頁面

src => views => 新增頁面(...-page)
p.s export 的 Page 要與 AppRouter 一樣

## 後端

### 1.建立頁面權限

Web => Models => Permissions 新增頁面名稱(命名須與前端 Model 相同)

### 2.新增 Controller

Web => Models => 新增該頁面 Models 檔案

Web => Controllers => 新增該頁面 Controller 檔案

### 3.新增 Repository

Core => Models => 新增該頁面要讀取 DB 的 Models 檔案

Core => Controllers => 新增該頁面 Repository 檔案
