import { ContainerFactory } from 'triviality';
import { CommanderModule } from '../src/CommanderModule';
import { CommanderPackageVersionModule } from '../src/VersionModule/CommanderPackageVersionModule';
import { CommanderExampleModule } from './CommanderExampleModule';

ContainerFactory
  .create()
  .add(CommanderModule)
  .add(CommanderPackageVersionModule)
  .add(CommanderExampleModule)
  .build()
  .then((container) => {
    container
      .commanderService()
      .parse(process.argv);
  });
