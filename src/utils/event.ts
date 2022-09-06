/**
 * 事件总线
 */
export default class event {
  // 所有事件
  events: Map<string, Function[]> = new Map<string, Function[]>();
  /**
   * 注册监听
   * @param name 事件的名称
   * @param func 触发的方法
   * @param isOnly 是否唯一触发(为true时,其他监听方法都放弃)
   */
  on(name: string, func: Function, isOnly: boolean = false) {
    const funcs = this.events.get(name) || [];
    if (isOnly) {
      this.events.set(name, [func]);
    } else {
      this.events.set(name, [...funcs, func]);
    }
  }
  /**
   * 触发监听
   * @param name 事件的名称
   * @param data 事件的参数
   */
  emit(name: string, data?: any) {
    if (this.events.get(name)) {
      const list: Function[] = this.events.get(name) || [];
      list.forEach(e => e(data));
    }
  }
  /**
   * 移除监听
   * @param name 移除事件的名称
   */
  remove(name: string) {
    if (this.events.get(name)) {
      this.events.delete(name);
    }
  }
  /**
   * 移除全部监听
   */
  clear() {
    this.events = new Map<string, Function[]>();
  }
}
