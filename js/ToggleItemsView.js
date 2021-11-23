import ComponentView from 'core/js/views/componentView';

class ToggleItemsView extends ComponentView {
  className() {
    let classes = super.className();

    if (this.model.get('_animateItems')) {
      classes += ' is-animated';
    }

    return classes;
  }

  preRender() {
    this.onClick = this.onClick.bind(this);

    this.listenTo(this.model.get('_children'), {
      'change:_isActive': this.onItemsActiveChange,
      'change:_isVisited': this.onItemsVisitedChange
    });
  }

  postRender() {
    this.$('.toggleitems__widget').imageready(() => {
      this.setReadyStatus();
    });
    this.setupItems();
    if (this.model.get('_animateItems')) {
      this.$('.toggleitems__widget').on('onscreen.animate', this.checkIfOnScreen.bind(this));
    }

    if (this.model.get('_setCompletionOn') !== 'inview') return;
    this.setupInviewCompletion();

  }

  checkIfOnScreen({ currentTarget }, { percentInviewVertical }) {
    if (percentInviewVertical < this.model.get('_percentInviewVertical')) return;

    $(currentTarget).off('onscreen.animate');
    this.animateItems();
  }

  setupItems() {
    const items = this.model.getChildren();
    if (!items || !items.length) return;

    const activeItem = this.model.getActiveItem();
    if (!activeItem) {
      const item = this.model.getChildren().findWhere({ _index: 0 });
      item.set('_isHighlighted', true);

    } else {
      const activeItems = this.model.getActiveItems();
      activeItems.forEach((item, index) => {
        item.trigger('change:_isActive', item, true);
      });
    }
  }

  onItemsVisitedChange(item, isActive) {
    const items = this.model.getChildren();

    const nextIndex = item.get('_index') + 1;

    if (isActive === false || items.length <= nextIndex) return;

    const nextItem = this.model.getChildren().findWhere({ _index: nextIndex });
    nextItem.set('_isHighlighted', true);
  }

  onItemsActiveChange(item, isActive) {
    const $item = this.getItemElement(item);
    $item.find('input').attr('checked', isActive);
  }

  getItemElement(item) {
    if (!item) return;
    const index = item.get('_index');
    return this.$('.toggleitems__item').filter(`[data-index="${index}"]`);
  }

  animateItems() {
    const _transitionSpeed = this.model.get('_transitionSpeed');
    this.model.getChildren().forEach((item, index) => {
      setTimeout(() => item.set('_isAnimated', true), (_transitionSpeed * index));
    });
  }

  onClick(event) {

    const $item = $(event.currentTarget).closest('.toggleitems__item');
    const itemIndex = $item.data('index');
    this.model.toggleItemsState(itemIndex);

  }

  remove() {
    this.$('.toggleitems__widget').off('onscreen.animate');
    super.remove();
  }
}
ToggleItemsView.template = 'toggle-items.jsx';

export default ToggleItemsView;
