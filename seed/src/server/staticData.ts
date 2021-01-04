export default class StaticData {
  private static instance: StaticData;

  public data: any = {};

  public setData = (key: string, value: any) => {
    this.data[key] = value;
  };

  public clearData = (key: string) => {
    this.data[key] = undefined;
  };

  public clearAll = () => {
    this.data = {};
    console.log('Data cleared', this.data);
  };

  public static getInstance(): StaticData {
    if (!StaticData.instance) {
      StaticData.instance = new StaticData();
      console.log('Creating new staticData');
    } else {
      console.log('reusing instance');
    }

    return StaticData.instance;
  }
}
