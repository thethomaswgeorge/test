import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListGroupPage } from './list-group.page';

describe('ListGroupPage', () => {
  let component: ListGroupPage;
  let fixture: ComponentFixture<ListGroupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListGroupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListGroupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
