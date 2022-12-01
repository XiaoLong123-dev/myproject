// 把数组转换为属性结构
// 递归算法
export function tranListToTree(list, rootnode) {
  // 用于存储节点信息
  let arr = [];
  list &&
    list.forEach((item) => {
      // 第一次传的rootnode是空
      // pid等于空，就是根节点
      if (item.pid == rootnode) {
        // 再去查找该节点的子节点
        // children 是子节点数组
        // pid==id就表示pid是id的子节点
        let children = tranListToTree(list, item.id);
        // 如果children.length不为空，表示有子节点
        if (children.length) {
          item.children = children;
        }
        // 把根节点推到数组中
        arr.push(item);
      }
    });
  // 返回该数组
  return arr;
}
