// 权限相关的接口
import request from "@/utils/request";

// 获取权限
export function getPermissionList() {
  return request({
    url: "/sys/permission",
  });
}
// 新增权限
export function addPermission(data) {
  return request({
    url: "/sys/permission",
    method: "post",
    data,
  });
}

// 更新权限
export function updatePermission(data) {
  return request({
    url: `/sys/permission/${data.id}`,
    method: "put",
    data,
  });
}

// 删除权限
export function delPermission(id) {
  return request({
    url: `/sys/permission/${id}`,
    method: "delete",
  });
}
// 获取权限详情
export function getPermissionDetail(id) {
  return request({
    url: `/sys/permission/${id}`,
  });
}
