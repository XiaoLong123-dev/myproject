// 工资设置相关的接口
import request from "@/utils/request";

/**
 *查询用户薪资列表
 * @param {*} data
 * @returns
 */
export function getSalarysList(data) {
  return request({
    url: "/salarys/list",
    data,
    method: "post",
  });
}

export function getTips(yearMonth) {
  return request({
    url: `/salarys/tips/${yearMonth}`,
  });
}

export function getSettings() {
  return request({
    url: "/salarys/setting",
  });
}

export function getCompanySetting() {
  return request({
    url: "/salarys/company-settings",
  });
}
export function saveSettings(data) {
  return request({
    url: "/salarysttings",
    method: "post",
    data,
  });
}
// 调薪
export function getSalaryDetail(userId) {
  return request({
    url: `/salarys/modify/${userId}`,
  });
}
export function changeSalary(data) {
  return request({
    url: `/salarys/modify/${data.userId}`,
    method: "post",
    data,
  });
}
export function initSalary(data) {
  return request({
    url: `/salarys/init/${data.userId}`,
    method: "post",
    data,
  });
}
export function getArchivingList(params) {
  return request({
    url: `/salarys/reports/${params.year}`,
    params,
  });
}
export function getArchivingCont(params) {
  return request({
    url: `/salarys/reports/${params.yearMonth}`,
    params,
  });
}
export function newReport(data) {
  return request({
    url: `/salarys/reports/${data.yearMonth}/newReport`,
    method: "put",
    data,
  });
}
export function getArchivingExport(params) {
  return request({
    url: `/salarys/reports/${params.yearMonth}/export`,
    params,
  });
}
export function getArchivingFirst(params) {
  return request({
    url: `/salarys/reports/${params.yearMonth}/first`,
    params,
  });
}
export function getArchivingArchive(data) {
  return request({
    url: `/salarys/reports/${data.yearMonth}/archive`,
    data,
    method: "post",
  });
}
