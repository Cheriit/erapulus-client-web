import {Injectable} from '@angular/core';
import {Actions} from '@ngrx/effects';

@Injectable({
  providedIn: 'root'
})
export class SidebarStoreEffects {
  // Init$ = createEffect(() =>
  //   This.dataPersistence.fetch(SidebarStoreActions.init, {
  //     Run: (
  //       Action: ReturnType<typeof SidebarStoreActions.init>,
  //       State: SidebarStoreFeature.SidebarStorePartialState
  //     ) => {
  //       // Your custom service 'load' logic goes here. For now just return a success action...
  //       Return SidebarStoreActions.loadSidebarStoreSuccess({
  //         SidebarStore: []
  //       });
  //     },
  //     OnError: (action: ReturnType<typeof SidebarStoreActions.init>, error) => {
  //       Console.error('Error', error);
  //       Return SidebarStoreActions.loadSidebarStoreFailure({error});
  //     }
  //   }), {dispatch: false}
  // );

  constructor (
    private readonly actions$: Actions
  ) {
  }
}
