import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DefaultLayoutComponent} from "./core/layout/default-layout/default-layout.component";
import {AdminAuthGuard} from "./core/guards/admin-auth-guard.service";

const routes: Routes = [
  {path: '', redirectTo: 'reviews', pathMatch: 'full'},
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'reviews',
        loadChildren: () => import('./modules/pages/reviews/reviews.module').then(m => m.ReviewsModule)
      },
      {
        path: 'articles',
        loadChildren: () => import('./modules/pages/articles/articles.module').then(m => m.ArticlesModule)
      },
      {
        path: 'first-feelings',
        loadChildren: () => import('./modules/pages/first-feelings/first-feelings.module').then(m => m.FirstFeelingsModule)
      },
      {
        path: 'posts/:postId',
        loadChildren: () => import('./modules/pages/review-detail/review-detail.module').then(m => m.ReviewDetailModule)
      },
      {
        path: 'edit-post/:postId',
        loadChildren: () => import('./modules/pages/edit-post/edit-post.module').then(m => m.EditPostModule)
      },
      {
        path: 'create-post',
        loadChildren: () => import('./modules/pages/create-post/create-post.module').then(m => m.CreatePostModule),
        canActivate: [AdminAuthGuard]
      }
    ]
  },
  {path: '**', pathMatch: 'full', redirectTo: 'orders/create'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AdminAuthGuard]
})
export class AppRoutingModule {
}
