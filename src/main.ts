import 'reflect-metadata';
import { Container } from 'inversify';
import Application from './app/application.js';
import { AppComponent } from './types/app-component.enum.js';
import { createApplicationContainer } from './app/app.container.js';
import { createUserContainer } from './modules/user/user.container.js';
import { createOfferContainer } from './modules/offer/offer.container.js';

async function bootstrap() {
  const mainContainer = Container.merge(createApplicationContainer(), createUserContainer(),createOfferContainer());
  const application = mainContainer.get<Application>(AppComponent.Application);
  await application.init();
}

bootstrap();
