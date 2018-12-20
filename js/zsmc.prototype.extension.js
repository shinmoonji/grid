Date.prototype.format = function (f) {
    if (!this.valueOf()) { return " "; }

    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;
    var h = null;

    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function ($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "mm": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            //case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
};
Date.prototype.utcFormat = function (f) {
    if (!this.valueOf()) return " ";

    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;
    var h = null;
    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function ($1) {
        switch ($1) {
            case "yyyy": return d.getUTCFullYear();
            case "yy": return (d.getUTCFullYear() % 1000).zf(2);
            case "mm": return (d.getUTCMonth() + 1).zf(2);
            case "dd": return d.getUTCDate().zf(2);
            case "E": return weekName[d.getUTCDay()];
            case "HH": return d.getUTCHours().zf(2);
            case "hh": return ((h = d.getUTCHours() % 12) ? h : 12).zf(2);
            //case "mm": return d.getUTCMinutes().zf(2);
            case "ss": return d.getUTCSeconds().zf(2);
            case "a/p": return d.getUTCHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
};
Date.prototype.isDate = function () {
    return this instanceof this && !isNaN(this.valueOf());
};
Date.prototype.dayDiff = function (date) {
    var datediff = this.getTime() - date.getTime(); //store the getTime diff - or +
    return Math.abs((datediff / (24 * 60 * 60 * 1000))); //Convert values to -/+ days and return value      
};
Date.prototype.addMonth = function (num) {
    this.setMonth(this.getMonth() + num);
    return this;
};
Date.prototype.addDays = function (num) {
    this.setDate(this.getDate() + num);
    return this;
};
Date.prototype.addMinutes = function (num) {
    this.setMinutes(this.getMinutes() + num);
    return this;
};
Date.prototype.addSeconds = function (num) {
    this.setSeconds(this.getSeconds() + num);
    return this;
};

String.prototype.string = function (len) { var s = '', i = 0; while (i++ < len) { s += this; } return s; };
String.prototype.zf = function (len) { return "0".string(len - this.length) + this; };
String.prototype.right = function (len) {
    if (len <= 0)
        return "";
    else if (len > String(this).length)
        return this;
    else {
        var intLen = String(this).length;
        return String(this).substring(intLen, intLen - len);
    }
};
String.prototype.byteLength = function (s, b, i, c) {
    //for (b = i = 0; c = this.charCodeAt(i++) ; b += c >> 11 ? 3 : c >> 7 ? 2 : 1);
    //return b;
    var contents = this;
    var str_character;
    var int_char_count;
    var int_contents_length;
    var k =0;
    int_char_count = 0;
    int_contents_length = contents.length;

    for (k = 0; k < int_contents_length; k++) {
        str_character = contents.charAt(k);
        if (escape(str_character).length > 4)
            int_char_count += 2;
        else
            int_char_count++;
    }
    return int_char_count;
};
String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined'
          ? args[number]
          : match
        ;
    });
};
String.prototype.replaceAll = function (org, dest) {
    return this.split(org).join(dest);
}

Number.prototype.zf = function (len) { return this.toString().zf(len); };
