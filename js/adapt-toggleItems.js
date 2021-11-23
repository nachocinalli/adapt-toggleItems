import Adapt from 'core/js/adapt';
import ToggleItemsModel from './ToggleItemsModel';
import ToggleItemsView from './ToggleItemsView';

export default Adapt.register('toggleItems', {
  model: ToggleItemsModel,
  view: ToggleItemsView
});
