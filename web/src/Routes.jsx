// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set, PrivateSet } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import { useAuth } from './auth'
import DashboardLayout from './layouts/DashboardLayout/DashboardLayout'
import UserLayout from './layouts/UserLayout/UserLayout'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />

      <Set wrap={UserLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Route path="/show-products/{id:Int}" page={ShowProductsPage} name="showProducts" />
      </Set>

      <PrivateSet unauthenticated="login">
        <Set wrap={DashboardLayout}>
          <Set wrap={ScaffoldLayout} title="Catalogues" titleTo="catalogues" buttonLabel="New Catalogue" buttonTo="newCatalogue">
            <Route path="/catalogues/new" page={CatalogueNewCataloguePage} name="newCatalogue" />
            <Route path="/catalogues/{id:Int}/edit" page={CatalogueEditCataloguePage} name="editCatalogue" />
            <Route path="/catalogues/{id:Int}" page={CatalogueCataloguePage} name="catalogue" />
            <Route path="/catalogues" page={CatalogueCataloguesPage} name="catalogues" />
          </Set>
          <Set wrap={ScaffoldLayout} title="Categories" titleTo="categories" buttonLabel="New Category" buttonTo="newCategory">
            <Route path="/categories/new" page={CategoryNewCategoryPage} name="newCategory" />
            <Route path="/categories/{id:Int}/edit" page={CategoryEditCategoryPage} name="editCategory" />
            <Route path="/categories/{id:Int}" page={CategoryCategoryPage} name="category" />
            <Route path="/categories" page={CategoryCategoriesPage} name="categories" />
          </Set>

          <Set wrap={ScaffoldLayout} title="Configurations" titleTo="configurations" buttonLabel="New Configuration" buttonTo="newConfiguration">
            <Route path="/configurations/new" page={ConfigurationNewConfigurationPage} name="newConfiguration" />
            <Route path="/configurations/{id:Int}/edit" page={ConfigurationEditConfigurationPage} name="editConfiguration" />
            <Route path="/configurations/{id:Int}" page={ConfigurationConfigurationPage} name="configuration" />
            <Route path="/configurations" page={ConfigurationConfigurationsPage} name="configurations" />
          </Set>
          <Set wrap={ScaffoldLayout} title="Users" titleTo="users" buttonLabel="New User" buttonTo="newUser">
            <Route path="/users/new" page={UserNewUserPage} name="newUser" />
            <Route path="/users/{id:Int}/edit" page={UserEditUserPage} name="editUser" />
            <Route path="/users/{id:Int}" page={UserUserPage} name="user" />
            <Route path="/users" page={UserUsersPage} name="users" />
          </Set>
          <Set wrap={ScaffoldLayout} title="Orders" titleTo="orders" buttonLabel="New Order" buttonTo="newOrder">
            <Route path="/orders/new" page={OrderNewOrderPage} name="newOrder" />
            <Route path="/orders/{id}/edit" page={OrderEditOrderPage} name="editOrder" />
            <Route path="/orders/{id}" page={OrderOrderPage} name="order" />
            <Route path="/orders" page={OrderOrdersPage} name="orders" />
          </Set>
          <Set wrap={ScaffoldLayout} title="Products" titleTo="products" buttonLabel="New Product" buttonTo="newProduct">
            <Route path="/products/new" page={ProductNewProductPage} name="newProduct" />
            <Route path="/products/{id:Int}/edit" page={ProductEditProductPage} name="editProduct" />
            <Route path="/products/{id:Int}" page={ProductProductPage} name="product" />
            <Route path="/products" page={ProductProductsPage} name="products" />
          </Set>
          <Set wrap={ScaffoldLayout} title="SubCategories" titleTo="subCategories" buttonLabel="New SubCategory" buttonTo="newSubCategory">
            <Route path="/sub-categories/new" page={SubCategoryNewSubCategoryPage} name="newSubCategory" />
            <Route path="/sub-categories/{id:Int}/edit" page={SubCategoryEditSubCategoryPage} name="editSubCategory" />
            <Route path="/sub-categories/{id:Int}" page={SubCategorySubCategoryPage} name="subCategory" />
            <Route path="/sub-categories" page={SubCategorySubCategoriesPage} name="subCategories" />
          </Set>
        </Set>
      </PrivateSet>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
