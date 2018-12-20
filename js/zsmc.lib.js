var zsmcJs = zsmcJs || {}
zsmcJs.lib = zsmcJs.lib || {}

zsmcJs.lib.type = {
    isObject: function (obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    },
    isArray: function (obj) {
        return toString.call(obj) === '[object Array]';
    }
}

zsmcJs.lib.date = {
    getDateString: function () {
        return datetime.replace(/\-/gi, '');
    },
    getDateTimeString: function (date, hours, minutes) {
        return date.replace(/\-/gi, '') + hours + minutes;
    },
    getDateTimeStringByDate: function (date) {
        return date.replace(/\-/gi, '').replace(/\:/gi, '').replace(/\ /gi, '');
    },
    getHoursString: function (datetime) {
        return datetime.substr(8, 2);
    },
    getMinutesString: function (datetime) {
        return datetime.substr(10, 2);
    },
    getTimeString: function (datetime) {
        return datetime.substr(8, 4);
    },
    getDateByString: function (date) {
        return (date && date.length >= 8) || (date && date.length == 12) ? (date.substr(0, 4) + "-" + date.substr(4, 2) + "-" + date.substr(6, 2)) : '';
    },
    getTimeByString: function (time) {
        return (time && time.length >= 4) ? (time.substr(0, 2) + ":" + time.substr(2, 2)) : '';
    },
    getDateTimeByString: function (dateTime) {
        var ret = '';
        if (dateTime && dateTime.length >= 12) {
            ret = dateTime.substr(0, 4) + "-" + dateTime.substr(4, 2) + "-" + dateTime.substr(6, 2) + " " + dateTime.substr(8, 2) + ":" + dateTime.substr(10, 2);
        }
        else if (dateTime && dateTime.length >= 6) {
            ret = dateTime.substr(0, 4) + "-" + dateTime.substr(4, 2) + "-" + dateTime.substr(6, 2) + " " + "00:00";
        }
        return ret;
    },
    getDateObject: function (datetimeString) {
        var date = new Date(datetimeString.substr(0, 10));
        var hour = datetimeString.substr(11, 2);
        var min = datetimeString.substr(14, 2);

        if (hour > 23) hour = "invalid";
        if (min > 59) min = "invalid";

        date.setHours(hour, min, 01);
        return date;
    },
    isDate: function (date) {
        return date instanceof Date && !isNaN(date.valueOf());
    },
    dayDiff: function (date1, date2) {
        var datediff = date1.getTime() - date2.getTime(); //store the getTime diff - or +
        return Math.abs((datediff / (24 * 60 * 60 * 1000))); //Convert values to -/+ days and return value      
    },
    addMonth: function (date, num) {
        var d = this.getDateObject(date);

        if (this.isDate(d)) {
            d.setMonth(d.getMonth() + num);
            return d;
        }
        return null;
    },
    addDays: function (date, num) {
        var d = this.getDateObject(date);

        if (this.isDate(d)) {
            d.setDate(d.getDate() + num);
            return d;
        }
        return null;
    },
    addMinutes: function (date, num) {
        var d = this.getDateObject(date);

        if (this.isDate(d)) {
            d.setMinutes(d.getMinutes() + num);
            return d;
        }
        return null;
    },
    addSeconds: function (date, num) {
        var d = this.getDateObject(date);

        if (this.isDate(d)) {
            d.setSeconds(d.getSeconds() + num);
            return d;
        }
        return null;
    }
}

zsmcJs.lib.number = {
    getNumberWithCommas: function (val) {
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    getRemoveCommas: function (val) {
        return val.replace(/\,/gi, '');
    }
}

zsmcJs.lib.cookie = {
    setCookie: function (c_name, value, exdays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
        document.cookie = c_name + "=" + c_value;
    },
    getCookie: function (c_name) {
        var i, x, y, ARRcookies = document.cookie.split(";");
        for (i = 0; i < ARRcookies.length; i++) {
            x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
            y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
            x = x.replace(/^\s+|\s+$/g, "");
            if (x == c_name) {
                return unescape(y);
            }
        }
    }
}

zsmcJs.lib.util = {
    // 유일한 ID 값을 생성합니다.
    // 참조: http://stackoverflow.com/a/14044299
    uniqueId: function () {
        return Math.round(new Date().getTime() + (Math.random() * 100));
    },
    formatBytes: function (bytes, decimals) {
        if (bytes == 0) return '0 Byte';
        var k = 1000; // or 1024 for binary
        var dm = decimals + 1 || 3;
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        var i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    },
    // http://stackoverflow.com/a/6226756
    // 문자열을 ASCII는 1, 멀티바이트 글자는 2로 계산하여 바이트 길이를 구합니다.
    getByteSize: function (str) {
        var len = 0;

        for (var i = 0; i < str.length; ++i) {
            if (escape(str.charAt(i)).length == 6) {
                len++;
            }
            len++;
        }

        return len;
    },
    // 참조: http://stackoverflow.com/a/4528265
    // utf8 문자열을 bytes로 변환
    bytesToString: function (byteArray) {
        var str = '';
        for (var i = 0; i < byteArray.length; i++)
            str += byteArray[i] <= 0x7F ?
                byteArray[i] === 0x25 ? "%25" : // %
                    String.fromCharCode(byteArray[i]) :
                "%" + byteArray[i].toString(16).toUpperCase();
        return decodeURIComponent(str);
    },
    // bytes를 utf8 문자열로 변환
    stringToBytes: function (str) {
        var byteArray = [];
        for (var i = 0; i < str.length; i++)
            if (str.charCodeAt(i) <= 0x7F)
                byteArray.push(str.charCodeAt(i));
            else {
                var h = encodeURIComponent(str.charAt(i)).substr(1).split('%');
                for (var j = 0; j < h.length; j++)
                    byteArray.push(parseInt(h[j], 16));
            }
        return byteArray;
    }
}

zsmcJs.lib.validator = {
    isLeastOne: function (val, data, exclude) {
        var result = false;
        exclude = exclude || [];
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                if (data[key] && $.grep(exclude, function (element, index) {
                    return element.name == key;
                }).length == 0) {
                    result = true;
                }
            }
        }
        return result;
    },
    isNotEmpty: function (val) {
        return val ? true : false;
    }
}


zsmcJs.lib.array = {
    getMatchedObject: function (matchedObject, key, isLastKey) {
        var me = this;
        var isMatched = false;

        if (zsmcJs.lib.type.isObject(matchedObject)) {
            for (propertyName in matchedObject) {
                if (propertyName == key) {
                    isMatched = true;
                    matchedObject = matchedObject[propertyName];
                    break;
                }
            }
        }
        if (isMatched)
            return matchedObject;
        else {

            if (isLastKey) matchedObject[key] = [];
            else matchedObject[key] = {};
            return matchedObject[key];
        }
    },
    groupBy: function (data, keys) {
        var me = this;
        var results = {};
        var matchedObject = {};


        $.each(data, function (index, d) {
            var keyValue = "";
            matchedObject = results;

            if (!zsmcJs.lib.type.isArray(keys)) {
                var temp = [];
                temp.push(keys);
                keys = temp;
            }

            $.each(keys, function (index, key) {
                matchedObject = me.getMatchedObject(matchedObject, d[key], index + 1 == keys.length);
                keyValue = d[key];
            });

            matchedObject.push(d);
        });

        return results;
    }
}

zsmcJs.lib.mapper = {
    bindDataByName: function ($root, data, objectName) {
        $root.find("input[name], textarea[name], select[name]").each(function () {
            var name = $(this).attr('name');
            var property = name.replace(objectName + ".", "");
            if (data[property] != undefined) {
                if ($(this).attr("type") == 'radio') {
                    $("input[name='" + name + "'][value=" + data[property] + "]").prop("checked", true);
                }
                else if ($(this).attr("type") == 'checkbox') {
                    $("input[name='" + name + "']").prop("checked", data[property]);
                }
                else if ($(this).parent().is(".date")) {
                    $(this).parent().datepicker('setDate', data[property]);
                }
                else {
                    $(this).val(data[property]);
                }
            }
        });
    },
    clearBindData: function ($root) {
        $root.find("input[name], textarea[name], select[name]").each(function () {
            var name = $(this).attr('name');
            if ($(this).attr("type") !== 'radio') {
                $(this).val("");
            }
            else {
                $("input[name='" + name + "']").prop("checked", false);
            }
        });
    },
    serialize: function ($root, objectName) {
        var data = {};

        $root.find("input[name], textarea[name], select[name]").each(function () {
            var name = $(this).attr('name');
            var property = name.replace(objectName + ".", "");
            if ($(this).attr("type") == 'file') {
                data[property] = $(this)[0].files[0];
            }
            else if ($(this).attr("type") == 'radio') {
                data[property] = $("input:radio[name='" + name + "']:checked").val()
            }
            else if ($(this).attr("type") == 'checkbox') {
                data[property] = $("input:checkbox[name='" + name + "']").is(":checked");
            }
            else {
                data[property] = $(this).val();
            }
        });

        return data;
    },
    serializeCollection: function ($root, listContainer, objectName) {
        var me = this;
        var index = 0;
        var data = {};
        data[objectName] = [];

        $root.find(listContainer).each(function () {
            $(this).find("[name]").each(function () {
                //var name = $(this).attr('name');
                //var replace = name.replace(/\[\d*\]/, '[' + (index) + ']');
                //$(this).attr('name', replace);
                var name = $(this).attr('name');
                var replace = name.replace(/\[]/, '');
                $(this).attr('name', replace);
            });
            index = index + 1;
            //data = $.extend(data, me.serialize($(this)));
            data[objectName].push(me.serialize($(this), objectName));
        });

        return data;
    }
}