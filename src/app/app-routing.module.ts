import { CreateEventComponent } from './tab2/create-event/create-event.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './tab2/edit-profile/edit-profile.component';
import { AuthGuardService } from './services/auth-guard.service';
import {ListUsersGroupComponent} from './components/list-users-group/list-users-group.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginPageModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'add-groups',
    loadChildren: () => import('./tab1/add-group/add-group.module').then( m => m.AddGroupPageModule),
  },
  {
    path: 'group/:id',
    component: ListUsersGroupComponent
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
  },
  {
    path: 'create-group',
    loadChildren: () => import('./create-group/create-group.module').then( m => m.CreateGroupPageModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then(  m => m.RegisterPageModule),
  },
  {
    path: 'list-group',
    loadChildren: () => import('./list-group/list-group.module').then( m => m.ListGroupPageModule)
  },
  {
    path: 'group-info',
    loadChildren: () => import('./group-info/group-info.module').then( m => m.GroupInfoPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
