/**
 * Created by Administrator on 2016/6/27.
 */
/*日期格式化模块*/
!function () {
    var a = function () {
        var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r = arguments.length, s = Number(this);
        return 1e12 > s && (s = 1e3 * s), b = new Date(s), a.ten = function (a) {
            return a > 9 ? a : "0" + a
        }, c = b.getFullYear(), d = a.ten(b.getMonth() + 1), 0 === r ? (e = new Date, f = s - e.getTime() > 0 ? "后" : "前", (g = Math.abs(c - e.getFullYear())) ? g + "年" + f : (h = Math.abs(d - e.getMonth() - 1)) ? h + "月" + f : (i = Math.abs(s - (new Date).getTime()), (j = Math.floor(i / 864e5)) ? j + "天" + f : (k = Math.floor(i / 36e5)) ? k + "小时" + f : (l = Math.floor(i / 6e4)) ? l + "分钟" + f : (m = Math.floor(i / 1e3), m ? m + "秒" + f : "刚刚"))) : (a.s = function (a) {
            return a.replace("Y", c).replace("M", d).replace("D", n).replace("h", o).replace("m", p).replace("s", q)
        }, n = a.ten(b.getDate()), o = a.ten(b.getHours()), p = a.ten(b.getMinutes()), q = a.ten(b.getSeconds()), a.s(arguments[0]))
    };
    Number.prototype.dateInfo = a, String.prototype.dateInfo = a
}();