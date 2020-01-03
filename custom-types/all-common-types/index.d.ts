declare module 'all-common-types' {
  export type Obj = {
    [x: string]: any
  }
  export type InputDate = string | number | Date
  export type Callback = (...args: any[]) => any
  export type OpType = 0 | 1 | 9 //0: city bus, 1: road bus, 9: taxi bus
  type ID = number | string
  export type Locale = 'zh' | 'en'
  export type HOC<InjectProps> = <Props>(Component: React.ComponentType<Props & InjectProps>) => React.ComponentType<Props & InjectProps>

  export type OnShelfOffShelf = {
    on_shelf_at: string
    off_shelf_at: string
  }
}