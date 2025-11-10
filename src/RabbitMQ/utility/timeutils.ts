class TimeUtils {
  static sleep(ms: number): Promise<void> {
    return new Promise((res) => setTimeout(res, ms));
  }
}

export default TimeUtils;
