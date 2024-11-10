import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page.component';
import { SpellBeeGameComponent } from './spellBee/components/spell-bee-game.component';
const routes: Routes = [
  {
    path: '',
    component : HomePageComponent
  },
   {
    path:'spell-bee',
    component:SpellBeeGameComponent
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
