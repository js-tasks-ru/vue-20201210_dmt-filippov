export const CounterButton = {
  // Шаблон потребуется отредактировать
  template: '<button type="button" @click="onclick">{{ count }}</button>',

  model: {
    prop: 'count',
    event: 'increment'
  },
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  methods: {
    onclick() {
      const newValue = this.count + 1;
      this.$emit('increment', newValue);
    }
  }
};
