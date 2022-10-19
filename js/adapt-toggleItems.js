import components from 'core/js/components';
import ToggleItemsModel from './ToggleItemsModel';
import ToggleItemsView from './ToggleItemsView';

export default components.register('toggleItems', {
  model: ToggleItemsModel,
  view: ToggleItemsView
});
