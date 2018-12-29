import { ContainerFactory } from 'triviality';
import { CommanderModule } from '../src';
import { CommanderPackageVersionModule } from '../src';
import { CommanderExampleModule } from './CommanderExampleModule';

ContainerFactory
  .create()
  .add(CommanderModule)
  .add(CommanderPackageVersionModule)
  .add(CommanderExampleModule)
  .build()
  .then((container) => {
    container
      .startCommanderService()
      .start();
  });
