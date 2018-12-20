var zsmcJs = zsmcJs || {};

zsmcJs.grid = (function (options) {
    "use strict";
    var instance = null;
    var _$table = null;
    var _$tableContainer = null
    var _options = options;
    var _details = {};
    var _template = {
        table: {
            container: "<div class='zsmc-grid'></div>",
            scrollHeader: "<div class='table-scroll-header'></div>",
            scrollBody: "<div class='table-scroll'></div>",
            wrap: "<div class='table-wrap'></div>",
            root: "<table></table>",
            header: "<thead><tr class='zsmc-grid-labels'></tr></thead>",
            headerItem: "<th style='width:{0}px' data-name='{1}'>{2}</th>",
            fixedHeaderItem: "<th class='left-fixed' style='width:{0}px; left:{3}px' data-name='{1}'>{2}</th>",
            body: "<tbody></tbody>",
            footer: "<tfoot><tr class='zsmc-grid-labels'></tr></tfoot>",
            group: "<tr data-rowkey={0} data-parent-rowkey={1}> \
                        <td colspan={2} class='zsmc-group' style='text-align:left'><span class='ui-icon fa fa-minus zsmc-pointer zsmc-group-title'></span>{3}</td> \
                    </tr>",
            groupIdent: "<td class='zsmc-group-ident' style='text-align:center; width: 20px'></td>",
            groupIdent2: "<td style='text-align:center; width: 20px'></td>",
            row: "<tr class='{0}' data-id='{1}' tabindex='{2}'></tr>",
            cell: "<td style='text-align:{0}; width:{1}px' data-name='{2}'>{3}</td>",
            fixedCell: "<td class='left-fixed' style='text-align:{0}; width:{1}px; left:{4}px' data-name='{2}'>{3}</td>",
            checkCell: "<td style='text-align:center; width: 60px'> \
                        <label><input type='checkbox' class='zsmc zsmc-check' /><span class='lbl'></span></label> \
                        </td>",
            tableHeader: "<table><thead><tr class='zsmc-grid-labels'></tr></thead></table>"
        },
        resizeColumnTemplate: "<span class='zsmc-grid-resize' style='cursor: col-resize'>&nbsp;</span>",
        cellTemplate: {
            checkBox: "<label><input type='checkbox' class='zsmc' {0} / onclick='return false;'><span class='lbl' /></span>",
            link: "<a href='{0}' target='{1}'>{2}</a>"
        },
        editors: {
            textBox: "<input class='input-sm form-control' type='text' name='{0}' style='text-align:{1};' />",
            datePicker: "<input type='text' name='{0}' class='input-date input-sm text-center form-control' value='{1}' />",
            selectBox: "<select class='input-sm form-control' name='{0}' style='text-align:{1};' />",
            radio: "<label> \
                        <input type='radio' name='{0}' class='zsmc' value='{1}' /> \
                        <span class='lbl'> {2}</span> \
                    </label>",
            checkBox: "<label><input type='checkbox' class='zsmc' name='{0}'/><span class='lbl'></span></label>",
            selectOption: "<option value='{0}'>{1}</option>",
            lookup: "<div></div>",
            textarea: "<textarea class='input-sm form-control' name='{0}' rows='2'></textarea>"
        },
        buttons: {
            roundButton: "\<button class='btn-primary btn-round input-sm zsmc-margin-left-5'> \
                    <i class=''></i> \
                    <span>{0}</span> \
                    </button>",
            deleteButton: "<span class='fa fa-trash zsmc-pointer zsmc-bigger-120 zsmc-margin-left-5' />",
            editButton: "<span id={0} class='fa fa-pencil zsmc-pointer zsmc-bigger-120' />"
        },
        paging: {
            pagingBox: "<div class='pagination' style='text-align:center' ><ul></ul></div>",
            currentPage: "<li><span class='now'>{0}</span></li>",
            linkPage: "<li><a href='javascript:'/ data-page='{0}'>{0}<li>"
        },
        editing: {
            popupContainer: "<div class='modal' style='display: none;'> \
                                <div class='modal-backdrop  in' style='height:100%;'><div></div></div> \
                                <div class='modal-dialog' style='width:800px'> \
                                    <div class='modal-content'> \
                                        <div class='modal-header'> \
                                            <span>{0}</span> \
                                        </div> \
                                        <div class='modal-body step-content'> \
                                        </div> \
                                        <div class='modal-footer wizard-actions'> \
                                        </div> \
                                    </div> \
                                </div> \
                            </div>"
        }
    };

    var dataType = {
        datetime: "datetime",
        bool: "bool",
        number: "number",
        text: "text"
    };

    var displayType = {
        link: 'link',
        datetime: 'datetime',
        checkBox: 'checkbox'
    }

    var editorType = {
        text: "text",
        date: "date",
        select: "select",
        checkBox: "checkbox",
        radio: "radio",
        lookup: "lookup",
        textarea: 'textarea'
    };
    var actionType = {
        add: "Add",
        update: "Update",
        copy: "Copy",
        insert: "Insert",
        delete: "Delete",
        cancel: "Cancel"
    };
    var editMode = {
        inline: "inline",
        popup: "popup"
    };
    var actionMode = {
        local: 'local',
        remote: 'remote'
    };

    var _loadParameter = {};

    var gridView = {
        options: options,
        $selectedRowEl: null,
        init: function () {
            var me = this;
            _options.viewOptions = _options.viewOptions || {};
            _options.editOptions = _options.editOptions || {};
 
            _options.editOptions.actionColumn = _options.editOptions.actionColumn || {};
            _options.editOptions.actionColumn.visible = _options.editOptions.actionColumn == undefined ? false : _options.editOptions.actionColumn.visible;
            _options.editOptions.actionColumn.editAction = _options.editOptions.actionColumn.editAction || {};
            _options.editOptions.actionColumn.editAction.visible = _options.editOptions.actionColumn.editAction.visible || false;
            _options.editOptions.actionColumn.deleteAction = _options.editOptions.actionColumn.deleteAction || {};
            _options.editOptions.actionColumn.deleteAction.visible = _options.editOptions.actionColumn.deleteAction.visible || false; 
            _options.editOptions.editing = _options.editOptions.editing || {};
            _options.editOptions.editing.popupView = _options.editOptions.editing.popupView || {};
            _options.editOptions.editing.addButton = _options.editOptions.editing.addButton || {};
            _options.editOptions.editing.updateButton = _options.editOptions.editing.updateButton || {};
            _options.editOptions.editing.cancelButton = _options.editOptions.editing.cancelButton || {};
            _options.editOptions.editing.copyButton = _options.editOptions.editing.copyButton || {};
            _options.editOptions.editing.deleteButton = _options.editOptions.editing.deleteButton || {};
            _options.editOptions.editing.insertButton = _options.editOptions.editing.insertButton || {};
            _options.editOptions.editing.addButton.visible = _options.editOptions.editing.addButton.visible == undefined ? false : _options.editOptions.editing.addButton.visible;
            _options.editOptions.editing.updateButton.visible = _options.editOptions.editing.updateButton.visible == undefined ? true : _options.editOptions.editing.updateButton.visible;
            _options.editOptions.editing.cancelButton.visible = _options.editOptions.editing.cancelButton.visible == undefined ? true : _options.editOptions.editing.cancelButton.visible;
            _options.editOptions.editing.copyButton.visible = _options.editOptions.editing.copyButton.visible == undefined ? false : _options.editOptions.editing.copyButton.visible;
            _options.editOptions.editing.deleteButton.visible = _options.editOptions.editing.deleteButton.visible == undefined ? false : _options.editOptions.editing.deleteButton.visible;
            _options.editOptions.editing.insertButton.visible = _options.editOptions.editing.insertButton.visible == undefined ? false : _options.editOptions.editing.insertButton.visible;

            _options.viewOptions.resizable = _options.viewOptions.resizable == undefined ? true : _options.viewOptions.resizable;

            _options.viewOptions.paging = _options.viewOptions.paging || {};
            _options.viewOptions.paging.visible = _options.viewOptions.paging.visible == undefined ? false : _options.viewOptions.paging.visible;

            _options.viewOptions.sorting = _options.viewOptions.sorting || {};
            _options.viewOptions.sorting.visible = _options.viewOptions.sorting.visible || false;

            _options.events = _options.events || {};
        },
        setInstance: function (inst) {
            instance = inst;
        },
        getNewRecordIndex: function () {
            return _options.viewOptions.paging.visible ? (provider.data.length / _options.viewOptions.paging.rowCount) : provider.data.length;
        },
        setLoadParameter: function (param) {
            var me = this;
            _loadParameter = param;
        },
        loadAjax: function () {
            var me = this;
            if (gridView.events.onBeforeLoadData() !== false) {
                if (_options.viewOptions.actionMode == actionMode.remote &&
                    (_options.viewOptions.sorting.visible || _options.viewOptions.paging.visible)) {
                    _loadParameter = $.extend({
                        sortingColumn: "",
                        sortingDataType: "",
                        direction: "",
                        pageNumber: 1,
                        rowCount: _options.viewOptions.paging.rowCount || 20
                    }, _loadParameter);
                }
                $.ajax({
                    url: _options.viewOptions.loadUrl,
                    type: 'GET',
                    data: _loadParameter,
                    success: function (result) {
                        if (Array.isArray(result)) {
                            provider.bindData(result);
                        }
                        else {
                            var jsonData = JSON.parse(result);
                            provider.bindData(jsonData);
                        }

                        gridView.events.onAfterSorting(sortingColumn, direction);
                        gridView.events.onAfterPaging(pageNumber);
                        gridView.events.onLoadedData();
                    }
                });
            }
        },
        draw: function ($grid) {
            var me = this;
            me.init();

            var tableWidth = 0;
            var actionColumnWidth = 0;

            if (_options.editOptions.actionColumn.visible) {
                actionColumnWidth = _options.editOptions.actionColumn.width ? _options.editOptions.actionColumn.width : 65;
            }
            _$table = $(_template.table.root);

            var $header = $(_template.table.tableHeader);
            var $footer = $(_template.table.footer);

            if (_options.viewOptions.checkable) {
                var $checkBoxCell = $(_template.table.headerItem.format(
                    60,
                    "",
                    "<label><input type='checkbox' class='zsmc zsmc-check' /><span class='lbl'></span></label>"));
                //$header.find("tr").append($checkBoxCell.append(_template.resizeColumnTemplate));
                $header.find("tr").append($checkBoxCell);
                $checkBoxCell.find("input:checkbox").on("click", function () {
                    _$table.find("tr td .zsmc-check").prop("checked", $(this).is(":checked"));
                });
            }

            if (_options.editOptions.actionColumn.visible) {
                var $headerCell = $(_template.table.headerItem.format(
                    actionColumnWidth,
                    "",
                    _options.editOptions.actionColumn.newAction.visible ? "<span class='ui-icon fa fa-plus zsmc-pointer zsmc-bigger-140'></span> Action" : ""));

                //$header.find("tr").append($headerCell.append(_template.resizeColumnTemplate));
                $header.find("tr").append($headerCell);
                $headerCell.find("span").click(function () {
                    if (_options.editOptions.actionColumn.newAction.customAction) {
                        _options.editOptions.actionColumn.newAction.customAction.call(this);
                        return;
                    }
                    var $data = me.createNewRow(me.getNewRecordIndex(), {});
                    _$table.find("tbody").append($data);
                    $data.click();

                    gridView.edit.startEdit($data, true);
                });
            }
            var left = 0;
            $.each(_options.columns, function (index, column) {
                var $headerCell = null;
                if (column.fixed === true) {
                    $headerCell = $(_template.table.fixedHeaderItem.format(column.width, column.name, column.header, left));
                    left += column.width;

                    if (column.visible == false) {
                        $headerCell.hide();
                    }
                    else {
                        tableWidth += column.width;
                    }
                    //$header.find("tr").append($headerCell.append(_template.resizeColumnTemplate));

                    //Sorting
                    if (_options.viewOptions.sorting.visible) {
                        gridView.sorting.drawSorting($headerCell, column);
                    }
                    $header.find("tr").append($headerCell);
                }


            });

            if (left > 0) {
                $headerCell = $(_template.table.headerItem.format(left, "", ""));
                $header.find("tr").append($headerCell);
            }

            $.each(_options.columns, function (index, column) {
                var $headerCell = null;
                if (column.fixed !== true) {
                    $headerCell = $(_template.table.headerItem.format(column.width, column.name, column.header));

                    if (column.visible == false) {
                        $headerCell.hide();
                    }
                    else {
                        tableWidth += column.width;
                    }
                    //$header.find("tr").append($headerCell.append(_template.resizeColumnTemplate));
                    //Sorting
                    if (_options.viewOptions.sorting.visible) {
                        gridView.sorting.drawSorting($headerCell, column);
                    }
                    $header.find("tr").append($headerCell);
                }
            });

            _$table.append(_template.table.body);
            _$table.append($footer);

            _$tableContainer = $(_template.table.container);
            var $tableWrap = $(_template.table.wrap);
            var $tableBodyScroll = $(_template.table.scrollBody);
            var $tableHeaderScroll = $(_template.table.scrollHeader);

            _options.width ? $header.width(_options.width) : $header.width(tableWidth + actionColumnWidth);
            _options.width ? _$table.width(_options.width) : _$table.width(tableWidth + actionColumnWidth);
            //_options.width ? _$tableHeaderScroll.width(_options.width) : _$tableHeaderScroll.width(tableWidth + actionColumnWidth);
            //_options.width ? _$tableScroll.width(_options.width) : _$tableScroll.width(tableWidth + actionColumnWidth);

            _options.maxWidth && $tableBodyScroll.css("max-width", _options.maxWidth);
            _options.maxHeight && $tableBodyScroll.css("max-height", _options.maxHeight);

            _options.maxWidth && $tableHeaderScroll.css("max-width", _options.maxWidth);
            _options.maxHeight && $tableHeaderScroll.css("max-height", _options.maxHeight);

            _options.height && _$table.find("tbody").css("height", _options.height);

            if (_options.viewOptions.loadUrl) {
                me.loadAjax();
            }

            if (_options.viewOptions.resizable) me.resizeColumns(_$table);

            $tableBodyScroll.scroll(function () {
                $tableHeaderScroll.scrollLeft(this.scrollLeft);
            });

            $tableHeaderScroll.append($header);
            $tableBodyScroll.append(_$table);
            $tableWrap.append($tableHeaderScroll);
            $tableWrap.append($tableBodyScroll);
            _$tableContainer.append($tableWrap);
            $grid.append(_$tableContainer);
        },
        toggleGroup: function (rowKey, isShow) {
            var me = this;
            if (rowKey) {
                $("[data-parent-rowkey={0}]".format(rowKey)).each(function () {

                    if (isShow) {

                    }
                    me.toggleGroup($(this).data("rowkey"), $(this).find("span").data("expand") !== undefined && isShow ? $(this).find("span").data("expand") : isShow);
                });

                if (isShow) {
                    $("[data-parent-rowkey={0}]".format(rowKey)).show();
                }
                else {
                    $("[data-parent-rowkey={0}]".format(rowKey)).hide();
                }

            }

        },
        createGroupData: function (groupData, parentKey, depth, colSpan) {
            var me = this;
            if (!depth) depth = 1;
            for (var group in groupData) {
                var key = zsmcJs.lib.util.uniqueId();

                var $groupRow = $(_template.table.group.format(key, parentKey || '', colSpan, group));
                $groupRow.find("td").width(_$table.width());

                for (var i = 1; i < depth; i++) {
                    $groupRow.prepend(_template.table.groupIdent);
                }

                //groupIdent
                $groupRow.find("span").click(function () {
                    var rowkey = $(this).closest("tr").data("rowkey");
                    var isShow = false;

                    if ($(this).hasClass("fa-plus")) {
                        $(this).removeClass("fa-plus");
                        $(this).addClass("fa-minus");
                        isShow = true;
                    }
                    else {
                        $(this).removeClass("fa-minus");
                        $(this).addClass("fa-plus");
                        isShow = false;
                    }

                    $(this).data("expand", isShow);
                    me.toggleGroup(rowkey, isShow);
                });

                _$table.find("tbody").append($groupRow);

                if (zsmcJs.lib.type.isArray(groupData[group])) {
                    $.each(groupData[group], function (index, d) {
                        var $data = me.createNewRow(index, d);
                        $data.attr("data-parent-rowkey", key);

                        for (var i = 0; i < depth; i++) {
                            $data.prepend(_template.table.groupIdent);
                        }
                        _$table.find("tbody").append($data);
                    });
                }
                else {
                    me.createGroupData(groupData[group], key, depth + 1, me.column.getVisibleColumnCount() + 2 + _options.viewOptions.groupBy.length - depth);
                }
            }
        },
        groupBy: function (keys) {
            var me = this;

            if (!_options.viewOptions.groupBy) {
                _options.viewOptions.groupBy = keys;
            }
            else if (zsmcJs.lib.type.isArray(_options.viewOptions.groupBy)) {
                _options.viewOptions.groupBy = $.merge(_options.viewOptions.groupBy, keys);
            }
            me.drawData(provider.data);
        },
        drawData: function (data) {
            var me = this;
            _$table.find("tbody").html("");
            //_$table.find("tbody").height();
            if (data) {
                if (_options.viewOptions.groupBy) {
                    me.createGroupData(zsmcJs.lib.array.groupBy(data, _options.viewOptions.groupBy), '', 1, me.column.getVisibleColumnCount() + 2 + _options.viewOptions.groupBy.length);
                }
                else {
                    $.each(data, function (index, d) {
                        var $data = me.createNewRow(index, d);
                        _$table.find("tbody").append($data);
                    });
                }
            }
        },
        createNewRow: function (index, d) {
            var me = this;
            var dataId = zsmcJs.lib.util.uniqueId();
            var $data = $(_template.table.row.format(index % 2 == 0 ? "zsmc-grid-row-odd" : "zsmc-grid-row-even", dataId, index));
            d = d || {};
            d.rowId = dataId;

            if (_options.viewOptions.checkable) {
                var $checkTemplate = $(_template.table.checkCell);
                $data.append($checkTemplate);

                $checkTemplate.find("input:checkbox").on("click", function () {
                    if (_$table.find("tr td .zsmc-check:checked").length === _$table.find("tr td .zsmc-check").length) {
                        _$table.find("tr th .zsmc-check").prop("checked", true);
                    }
                    else {
                        _$table.find("tr th .zsmc-check").prop("checked", false);
                    }
                });
            }
            if (_options.editOptions.actionColumn.visible) {
                var $actionTemplate = $("<td style='text-align:center; width:{0}px'></td>".format(_options.editOptions.actionColumn.width));

                if (_options.editOptions.actionColumn.editAction.visible) {
                    var $editButton = $(_template.buttons.editButton.format(zsmcJs.lib.util.uniqueId()));
                    $editButton.click(function () {
                        var $row = $(this).closest("tr");
                        gridView.edit.startEdit($row);
                    });
                    $actionTemplate.append($editButton);
                }

                if (_options.editOptions.actionColumn.deleteAction.visible) {
                    var $deleteButton = $(_template.buttons.deleteButton);
                    $actionTemplate.append($deleteButton);

                    $deleteButton.click(function () {
                        var $el = $(this).closest("tr");
                        var rowId = $el.data("id");
                        var deleteData = provider.getJsonByRowId(rowId);
                        if (gridView.events.onRowDeleting.call(this, deleteData, rowId) !== false) {
                            if (confirm("Are you sure delete record?")) {
                                me.edit.deleteAction($el, deleteData, rowId, false);
                            }
                        }
                    });
                }
                $data.append($actionTemplate);
            }

            var left = 0;
            $.each(_options.columns, function (index, column) {
                if (column.fixed === true) {
                    if (column.visible == undefined || column.visible) {
                        var value = '';
                        value = d[column.name];

                        if (column.selectOptions) {
                            $.each(column.selectOptions, function (index, option) {
                                if (option.value === value) {
                                    value = option.text;
                                    return false;
                                }
                            });
                        }
                        if (column.displayType === displayType.datetime) {
                            if (value) value = (new Date(value)).format(column.displayFormat);
                        }
                        else if (column.displayType === displayType.checkBox) {
                            value = _template.cellTemplate.checkBox.format(value ? 'checked' : '');
                        }
                        else if (column.displayType === displayType.link) {
                            for (var key in d) {
                                column.link = column.link.replaceAll("{{{0}}}".format(key), d[key]);
                            }
                            value = _template.cellTemplate.link.format(column.link, column.target || '_blank', value);
                        }

                        $data.append(_template.table.fixedCell.format(column.align || 'left', column.width, column.name, value || '', left));
                        left += column.width;
                    }
                }
            });

            if (left > 0) {
                $data.append(_template.table.cell.format('left', left, '', ''));
            }



            $.each(_options.columns, function (index, column) {
                if (column.fixed !== true) {
                    if (column.visible == undefined || column.visible) {
                        var value = '';
                        value = d[column.name];

                        if (column.selectOptions) {
                            $.each(column.selectOptions, function (index, option) {
                                if (option.value === value) {
                                    value = option.text;
                                    return false;
                                }
                            });
                        }
                        if (column.displayType === displayType.datetime) {
                            if (value) value = (new Date(value)).format(column.displayFormat);
                        }
                        else if (column.displayType === displayType.checkBox) {
                            value = _template.cellTemplate.checkBox.format(value ? 'checked' : '');
                        }
                        else if (column.displayType == displayType.link) {
                            for (var key in d) {
                                column.link = column.link.replaceAll("{{{0}}}".format(key), d[key]);
                            }
                            value = _template.cellTemplate.link.format(column.link, column.target || '_blank', value);
                        }


                        $data.append(_template.table.cell.format(column.align || 'left', column.width, column.name, value || ''));
                    }
                }
            });


            $data.click(function () {
                //if (!gridView.edit.inline.$editingRow) event.preventDefault(); //why add a this code.. ???
                if (!gridView.edit.inline.$editingRow || gridView.edit.inline.$editingRow.data("id") === $data.data("id")) {

                    var row = provider.getJsonByRowId(dataId);
                    if (_options.viewOptions.selectable) {
                        $(this).closest('tbody').children("tr").removeClass("zsmc-row-selected");
                        $(this).addClass("zsmc-row-selected");

                        gridView.$selectedRowEl = $data;
                        provider.selectedRow = row;
                    }
 
                    gridView.events.onRowClicked.call(this, row, dataId);
                }
            });
            $data.dblclick(function () {
                var row = provider.getJsonByRowId(dataId);
                if (_options.viewOptions.selectable) {
                    gridView.$selectedRowEl = null;
                    provider.selectedRow = row;
                }
                gridView.events.onRowDblClicked.call(this, row, dataId);

            });

            if (_options.viewOptions.selectable) {
                $data.keydown(function (evt) {
                    if (!gridView.edit.inline.$editingRow) {
                        gridView.$selectedRowEl = gridView.$selectedRowEl || $data;

                        switch (evt.keyCode) {
                            case 13:
                                gridView.$selectedRowEl = null;
                                var row = provider.getJsonByRowId(dataId);
                                provider.selectedRow = row;
                                gridView.events.onRowEnterKeyDown.call(this, row, dataId);
                                break;

                            case 40:
                                var $nextElement = gridView.$selectedRowEl.next();
                                if ($nextElement.is("tr")) {
                                    gridView.$selectedRowEl.removeClass("zsmc-row-selected");
                                    $nextElement.addClass("zsmc-row-selected");
                                    gridView.$selectedRowEl = $nextElement;
                                    $nextElement.focus();
                                }
                                break;

                            case 38:
                                var $prevElement = gridView.$selectedRowEl.prev();
                                if ($prevElement.is("tr")) {
                                    gridView.$selectedRowEl.removeClass("zsmc-row-selected");
                                    $prevElement.addClass("zsmc-row-selected");

                                    gridView.$selectedRowEl = $prevElement;
                                    $prevElement.focus();
                                }
                                break;
                        }
                        event.preventDefault();
                    }
                });
            }

            return $data;
        },
        selectRowByIndex: function (rowIndex) {
            var $selectRow = _$table.find("tbody tr:eq({0})".format(rowIndex));
            var dataId = $selectRow.data("id");

            if (dataId && rowIndex > -1) {
                var row = provider.getJsonByRowId(dataId);
                provider.selectedRow = row;

                $selectRow.closest('tr').removeClass("zsmc-row-selected");
                $selectRow.addClass("zsmc-row-selected");

                gridView.$selectedRowEl = $selectRow;
                return true;
            }
            return false;
        },
        selectPrevRow: function () {
            if (gridView.$selectedRowEl) {
                var $prevRow = gridView.$selectedRowEl.prev();
                var dataId = $prevRow.data("id");

                if (dataId) {
                    gridView.$selectedRowEl.removeClass("zsmc-row-selected");
                    $prevRow.addClass("zsmc-row-selected");

                    gridView.$selectedRowEl = $prevRow;
                    gridView.$selectedRowEl.focus();
                }
            }
        },
        selectNextRow: function () {
            if (gridView.$selectedRowEl) {
                var $nextRow = gridView.$selectedRowEl.next();
                var dataId = $nextRow.data("id");

                if (dataId) {
                    gridView.$selectedRowEl.removeClass("zsmc-row-selected");
                    $nextRow.addClass("zsmc-row-selected");

                    gridView.$selectedRowEl = $nextRow;
                    gridView.$selectedRowEl.focus();
                }
            }
        },
        select: function () {
            if (gridView.$selectedRowEl) {
                var dataId = gridView.$selectedRowEl.data("id");
                if (dataId) {
                    gridView.$selectedRowEl = null;
                    var row = provider.getJsonByRowId(dataId);
                    gridView.events.onRowEnterKeyDown.call(this, row, dataId);
                    return true;
                }
            }
            return false;
        },
        resizeColumns: function ($table) {
            $table.find("thead th span").each(function (th) {
                var $resizer = $(this);
                var $th = $resizer.parent();

                var start = 0;
                var resizeWidth = $th.width();
                $resizer.mousedown(function (e) {
                    start = e.pageX;
                    var width = $th.width();

                    $table.bind("mouseup", function () {
                        $table.unbind("mousemove");
                        $table.unbind("mouseup");
                        $table.unbind("mouseleave");
                    });
                    $table.bind("mouseleave", function () {
                        $table.unbind("mousemove");
                        $table.unbind("mouseup");
                        $table.unbind("mouseleave");
                    });

                    $table.mousemove(function (e) {
                        resizeWidth = width + e.pageX - start;
                        $th.width(resizeWidth);
                    });
                });
            });
        },
        column: {
            setVisibleByName: function (name, visible) {
                $.each(gridView.options.columns, function (index, column) {
                    if (column.name == name) {
                        column["visible"] = visible;
                        visible ? _$table.find("[data-name={0}]".format(name)).show() : _$table.find("[data-name={0}]".format(name)).hide();
                    }
                });
            },
            getVisibleColumnCount: function () {
                var me = this;
                var count = 0;
                $.each(_options.columns, function (index, column) {
                    if (column.visible || column.visible === undefined) count++;
                });

                return count;
            }
        },
        edit: {
            updateAjax: function (callback, $row, updateData, returnCallback) {
                var me = this;
                $.ajax({
                    url: _options.editOptions.updateActionUrl,
                    type: 'POST',
                    data: { entity: updateData },
                    success: function (result) {
                        updateData[_options.keyField] = result[_options.keyField];
                        callback.call(me, $row, updateData);
                        if (returnCallback) returnCallback.call(me, true);
                    }
                })
                    .fail(function (jqxhr, textStatus, error) {
                        var err = textStatus + ', ' + error;
                        alert("Failed to complete your request. \r\n " + err);
                        if (returnCallback) returnCallback.call(me, false);
                    });
            },
            updateAjaxPromise: function (callback, $row, updateData, resolve, reject) {
                var me = this;
                $.ajax({
                    url: _options.editOptions.updateActionUrl,
                    type: 'POST',
                    data: updateData,
                    success: function (result) {
                        updateData[_options.keyField] = result[_options.keyField];
                        callback.call(me, $row, updateData);
                        resolve(true);
                    }
                })
                    .fail(function (jqxhr, textStatus, error) {
                        var err = textStatus + ', ' + error;
                        alert("Failed to complete your request. \r\n " + err);
                        reject(err);
                    });
            },
            deleteAjax: function (callback, $row, deleteData, rowId) {
                var me = this;
                $.ajax({
                    url: _options.editOptions.deleteActionUrl,
                    type: 'DELETE',
                    data: deleteData,
                    success: function (result) {
                        callback.call(me, $row, deleteData, rowId);
                    }
                })
                    .fail(function (jqxhr, textStatus, error) {
                        var err = textStatus + ', ' + error;
                        alert("Failed to complete your request. \r\n " + err);
                    });

            },
            startEdit: function ($row, isNew) {
                var me = this;
                var data = null;
                if ($row) {
                    var rowId = $row.data('id');
                    $row.data('isNew', isNew);
                    data = provider.getJsonByRowId(rowId);
                }

                switch (_options.editOptions.editing.mode) {
                    case editMode.inline:
                        if (me.inline.$editingRow) {
                            me.cancelEdit(me.inline.$editingRow);
                        }
                        me.inline.$editingRow = $row;
                        me.inline.draw($row, data);
                        gridView.events.onEditorLoaded($row, data, rowId);
                        break;

                    case editMode.popup:
                        me.popup.$root = $(_template.editing.popupContainer.format(_options.editOptions.editing.popupView.title || ''));
                        _$table.append(me.popup.$root);
                        me.popup.$root.find(".modal-body").html($("#" + _options.editOptions.editing.popupView.template).html());

                        var $footer = me.popup.$root.find(".modal-footer");

                        if (_options.editOptions.editing.addButton.visible) {
                            var $addButton = $(_template.buttons.roundButton.format(_options.editOptions.editing.addButton.caption || actionType.add));
                            $footer.append($addButton);
                        }

                        if (_options.editOptions.editing.updateButton.visible) {
                            var $updateButton = $(_template.buttons.roundButton.format(_options.editOptions.editing.updateButton.caption || actionType.update));
                            $footer.append($updateButton);

                            $updateButton.click(function () {
                                var entity = zsmcJs.lib.mapper.serialize(me.popup.$root.find(".modal-body"));
                                entity = $.extend(data, entity);
                                $.each(_options.editOptions.editing.popupView.details, function (detailIndex, detail) {
                                    switch (detail.viewType) {
                                        case "grid": entity[detail.entity] = _details[detail.entity].Provider.getChangedRecords(); break;
                                        case "form": entity[detail.entity] = _details[detail.entity].Provider.getDirtyRows(); break;
                                    }
                                });

                                var isPromiseNotSupported = true;
                                try {
                                    var promise = new Promise(function (resolve, reject) {
                                        gridView.edit.updateEditPromise($row, entity, rowId, resolve, reject);
                                    });
                                    promise.then(function (result) { me.popup.$root.remove(); });
                                    isPromiseNotSupported = false;
                                }
                                catch (e) {

                                }

                                if (isPromiseNotSupported && gridView.edit.updateEdit($row, entity, rowId, function (returnValue) {
                                    if (returnValue) $popup.remove();
                                })) {
                                    me.popup.$root.remove();
                                }
                            });
                        }

                        //if (_options.editOptions.editing.copyButton.visible) {
                        //    var $copyButton = $(_template.buttons.roundButton.format(_options.editOptions.editing.copyButton.caption || actionType.copy));
                        //    $footer.append($copyButton);
                        //}

                        //if (_options.editOptions.editing.insertButton.visible) {
                        //    var $insertButton = $(_template.buttons.roundButton.format(_options.editOptions.editing.insertButton.caption || actionType.insert));
                        //    $footer.append($insertButton);
                        //}

                        //if (_options.editOptions.editing.deleteButton.visible) {
                        //    var $deleteButton = $(_template.buttons.roundButton.format(_options.editOptions.editing.deleteButton.caption || actionType.delete));
                        //    $footer.append($deleteButton);
                        //}

                        if (_options.editOptions.editing.cancelButton.visible) {
                            var $cancelButton = $(_template.buttons.roundButton.format(_options.editOptions.editing.cancelButton.caption || actionType.cancel));
                            $footer.append($cancelButton);

                            $cancelButton.click(function () {
                                if (isNew) $row.remove();
                                me.popup.$root.remove();
                            });
                        }

                        $.each(_options.editOptions.editing.popupView.lookupEditors, function (lookupIndex, lookupItem) {
                            var lookup = new zsmcJs.lookup(lookupItem.type, lookupItem.options);
                            lookup.LookupView.draw($("#" + lookupItem.id));
                        });

                        if (_options.editOptions.editing.loadUrl) {

                            var param = {};
                            param[_options.keyField] = data[_options.keyField];
                            $.ajax({
                                url: _options.editOptions.editing.loadUrl,
                                type: 'GET',
                                data: param,
                                success: function (result) {
                                    gridView.edit.popup.setData(result);
                                }
                            })
                                .fail(function (jqxhr, textStatus, error) {
                                });
                        }

                        zsmcJs.lib.mapper.bindDataByName(me.popup.$root.find(".modal-body"), data);
                        $.each(_options.editOptions.editing.popupView.details, function (detailIndex, detail) {
                            switch (detail.viewType) {
                                case "grid":
                                    var grid = new zsmcJs.grid(detail.options);
                                    _details[detail.entity] = grid;
                                    gridView.events.onBeforeLoadDetails("grid", grid, data);
                                    grid.GridView.draw(me.popup.$root.find("#" + detail.elementId));
                                    //grid.Provider.bindData(data[detail.entity] || []);

                                    break;

                                case "form":
                                    var form = new zsmcJs.listForm(detail.options);
                                    _details[detail.entity] = form;
                                    gridView.events.onBeforeLoadDetails("form", form, data);
                                    form.FormView.load(me.popup.$root.find("#" + detail.elementId), detail.entity);
                                    //form.Provider.bindData(data[detail.entity] || []);
                                    break;
                            }
                        });
                        gridView.events.onBeforeOpenPopup(data);

                        me.popup.$root.show();

                        gridView.events.onEditorLoaded(me.popup.$root, data, rowId);
                        break;
                }
            },
            updateEdit: function ($row, updateData, rowId, returnCallBack) {
                var me = this;
                var rowId = $row.data('id');
                if (gridView.events.onRowUpdating.call(this, updateData, rowId) !== false) {
                    if (_options.editOptions.actionMode === actionMode.remote) me.updateAjax(me.updateRow, $row, updateData, returnCallBack);
                    else {
                        me.updateRow($row, updateData);
                    }

                    return true;
                }
                return false;
            },
            updateEditPromise: function ($row, updateData, rowId, resolve, reject) {
                var me = this;
                var rowId = $row.data('id');
                if (gridView.events.onRowUpdating.call(this, updateData, rowId) !== false) {
                    if (_options.editOptions.actionMode === actionMode.remote) me.updateAjaxPromise(me.updateRow, $row, updateData, resolve, reject);
                    else {
                        me.updateRow($row, updateData);
                        resolve(true);
                    }

                    return true;
                }
                return false;
            },
            cancelEdit: function ($row) {
                var me = this;
                var rowId = $row.data('id');
                var data = provider.getJsonByRowId(rowId);

                switch (_options.editOptions.editing.mode) {
                    case editMode.inline:
                        if ($.isEmptyObject(data)) {
                            $row.next().remove();
                            $row.remove();
                        }
                        else {
                            me.inline.cancel($row, data);
                            $row.next().remove();
                            $row.focus();
                        }
                        me.inline.$editingRow = null;
                        break;

                    case editMode.popup:
                        break;
                }
            },
            updateRow: function ($row, updateData) {
                var me = this;
                var rowId = $row.data('id');
                var data = provider.getJsonByRowId(rowId);

                if ($.isEmptyObject(data)) {
                    updateData[_options.keyField] = 0;
                    updateData.rowId = rowId;
                }
                switch (_options.editOptions.editing.mode) {
                    case editMode.inline:
                        me.inline.update($row, updateData, rowId);
                        gridView.events.onRowUpdated.call(this, updateData, rowId);
                        break;

                    case editMode.popup:
                        me.popup.update($row, data, updateData, rowId);
                        gridView.events.onRowUpdated.call(this, updateData, rowId);
                        break;

                    default: return false;
                }

                $row.focus();
                return true;
            },
            deleteAction: function ($row, deleteData, rowId, inline) {
                var me = this;
                if (_options.editOptions.actionMode === actionMode.remote) gridView.edit.deleteAjax(me.deleteRow, $row, deleteData, rowId);
                else me.deleteRow($row, deleteData, rowId, inline);
            },
            deleteRow: function ($row, deleteData, rowId, inline) {
                var me = this;

                provider.removeByRowId(rowId);
                if (_options.viewOptions.paging.visible) {
                    gridView.paging.drawSpecifyPage(gridView.paging.currentPage);
                } else {
                    if (inline) { $row.next().remove(); }
                    $row.remove();
                    _$table.find("tbody tr").each(function (index, tr) {
                        $(tr).removeClass("zsmc-grid-row-odd");
                        $(tr).removeClass("zsmc-grid-row-even");

                        $(tr).addClass(index % 2 == 0 ? "zsmc-grid-row-odd" : "zsmc-grid-row-even");
                    });
                }
                deleteData.IsDelete = true;
                provider.deletedRecords.push(deleteData);
                gridView.events.onRowDeleted.call(this, deleteData, rowId);
            },
            inline: {
                $editingRow: null,
                field: {
                    drawTextBox: function ($cell, column, value) {
                        var $text = $(_template.editors.textBox.format(column.name, column.align));
                        $text.val(value);
                        $cell.html($text);
                    },
                    drawDate: function ($cell, column, value) {
                        var $date = $(_template.editors.datePicker.format(column.name, ''));

                        if (!(value instanceof Date && !isNaN(value.valueOf()))) value = new Date(value);
                        $date.datepicker({ format: column.displayFormat });
                        $date.val(value.format(column.displayFormat));
                        $cell.html($date);
                    },
                    drawSelectBox: function ($cell, column, value) {
                        var $select = $(_template.editors.selectBox.format(column.name, column.align));
                        $.each(column.selectOptions, function (index, option) {
                            $select.append(_template.editors.selectOption.format(option.value, option.text));
                        });
                        $select.val(value);
                        $cell.html($select);
                    },
                    drawRadio: function ($cell, column, value) {
                        var $radio = $('<div></div>');
                        $.each(column.selectOptions, function (index, option) {
                            var $option = $(_template.editors.radio.format(column.name, option.value, option.text));

                            if (option.value === value) $option.find('input').prop("checked", true);

                            $radio.append($option);
                        });
                        $cell.html($radio);
                    },
                    drawCheckBox: function ($cell, column, value) {
                        var $checkBox = $(_template.editors.checkBox.format(column.name, column.align));
                        $checkBox.find('input:checkbox').prop("checked", value);
                        $cell.html($checkBox);
                    },
                    drawLookup: function ($cell, column, data) {
                        var $lookup = $(_template.editors.lookup);
                        column.editor.lookup = new zsmcJs.lookup(column.editor.lookupType, column.editor.lookupOptions);
                        column.editor.lookup.LookupView.draw($lookup);

                        column.editor.lookup.LookupView.code(data[column.editor.codeField]);
                        column.editor.lookup.LookupView.value(data[column.editor.valueField]);
                        $cell.html($lookup);
                    },
                    drawTextArea: function ($cell, column, value) {
                        var $textarea = $(_template.editors.textarea.format(column.name, column.align));
                        $textarea.val(value);
                        $cell.html($textarea);
                    }
                },
                getUpdatingRow: function ($el, data) {
                    var me = this;
                    var isValid = gridView.edit.isValid($el);
                    if (isValid) {
                        var rowId = $el.data('id');
                        var data = provider.getJsonByRowId(rowId);
                        $.each(_options.columns, function (index, column) {
                            var value;
                            if ((column.visible == undefined || column.visible) && column.editor) {
                                var $cell = $el.find('td[data-name={0}]'.format(column.name));

                                switch (column.editor.type) {
                                    case editorType.lookup:
                                        if (column.editor.lookup.LookupView.code()) {
                                            data[column.editor.codeField] = column.editor.lookup.LookupView.code();
                                            data[column.editor.valueField] = column.editor.lookup.LookupView.value();
                                        }
                                        break;
                                    case editorType.checkBox:
                                        value = $cell.find("input[name='{0}']".format(column.name)).is(":checked");
                                        data[column.name] = value;
                                        break;

                                    case editorType.textarea:
                                        value = $cell.find("textarea[name='{0}']".format(column.name)).val();
                                        data[column.name] = value;
                                        break;

                                    case editorType.select:
                                    case editorType.radio:
                                        if (column.selectOptions) {
                                            value = $cell.find("select[name='{0}'], input:radio[name='{0}']:checked".format(column.name)).val();

                                            if (column.selectOptions) {
                                                if (value) {
                                                    $.each(column.selectOptions, function (index, option) {
                                                        if (option.value == value) {
                                                            data[column.name] = option.value;
                                                            return false;
                                                        }
                                                    });
                                                }
                                                else {
                                                    data[column.name] = '';
                                                }
                                            }
                                        }
                                        break;

                                    case editorType.date:
                                        data[column.name] = new Date($cell.find("input[name='{0}']".format(column.name)).val());
                                        break;

                                    default:
                                        value = $cell.find("input[name='{0}']".format(column.name)).val() || '';
                                        data[column.name] = value;
                                        break;
                                }
                            }
                        });

                        return data;
                    }

                    return {};
                },
                draw: function ($el, data) {
                    var me = this;
                    $.each(_options.columns, function (index, column) {
                        if (column.visible == undefined || column.visible) {
                            var $cell = $el.find('td[data-name={0}]'.format(column.name));

                            if (column.editor && column.editor.type) {
                                switch (column.editor.type) {
                                    case editorType.text: gridView.edit.inline.field.drawTextBox($cell, column, data[column.name]); break;
                                    case editorType.date: gridView.edit.inline.field.drawDate($cell, column, data[column.name] || new Date()); break;
                                    case editorType.select: gridView.edit.inline.field.drawSelectBox($cell, column, data[column.name]); break;
                                    case editorType.checkBox: gridView.edit.inline.field.drawCheckBox($cell, column, data[column.name]); break;
                                    case editorType.radio: gridView.edit.inline.field.drawRadio($cell, column, data[column.name]); break;
                                    case editorType.lookup: gridView.edit.inline.field.drawLookup($cell, column, data); break;
                                    case editorType.textarea: gridView.edit.inline.field.drawTextArea($cell, column, data[column.name]); break;
                                }
                            }
                        }
                    });

                    var $editActionBar = $("<tr><td colspan={0}></td></tr>".format(provider.getVisibleColumns().length + 1));
                    $editActionBar.find("td").append("<div style='display:inline-block;width:{0}px'></div>".format(_options.editOptions.actionColumn.width ? _options.editOptions.actionColumn.width : 65));

                    if (_options.editOptions.editing.addButton.visible) {
                        var $addButton = $(_template.buttons.roundButton.format(_options.editOptions.editing.addButton.caption || actionType.add));
                        $editActionBar.find("td").append($addButton);
                        $addButton.click(function () {
                            var updateData = me.getUpdatingRow($el);
                            if (!$.isEmptyObject(updateData)) {
                                gridView.edit.updateEdit($el, updateData);
                                var $data = gridView.createNewRow(gridView.getNewRecordIndex(), {});
                                _$table.find("tbody").append($data);
                                $data.click();
                                gridView.edit.startEdit($data, true);
                            }
                        });
                    }
                    if (_options.editOptions.editing.updateButton.visible) {
                        var $updateButton = $(_template.buttons.roundButton.format(_options.editOptions.editing.updateButton.caption || actionType.update));
                        $updateButton.click(function () {
                            var updateData = me.getUpdatingRow($el);
                            if (!$.isEmptyObject(updateData)) {
                                gridView.edit.updateEdit($el, updateData);
                            }
                        });
                        $editActionBar.find("td").append($updateButton);
                    }

                    if (_options.editOptions.editing.copyButton.visible) {
                        var $copyButton = $(_template.buttons.roundButton.format(_options.editOptions.editing.copyButton.caption || actionType.copy));
                        $editActionBar.find("td").append($copyButton);
                    }

                    if (_options.editOptions.editing.insertButton.visible) {
                        var $insertButton = $(_template.buttons.roundButton.format(_options.editOptions.editing.insertButton.caption || actionType.insert));
                        $editActionBar.find("td").append($insertButton);
                    }

                    if (_options.editOptions.editing.deleteButton.visible) {
                        var $deleteButton = $(_template.buttons.roundButton.format(_options.editOptions.editing.deleteButton.caption || actionType.delete));
                        $editActionBar.find("td").append($deleteButton);
                        $deleteButton.click(function () {
                            var rowId = $el.data("id");
                            var deleteData = provider.getJsonByRowId(rowId);
                            if (gridView.events.onRowDeleting.call(this, data, rowId) !== false) {
                                if (confirm("Are you sure delete record?")) {
                                    gridView.edit.deleteAction($el, deleteData, rowId, true);
                                }
                            }
                        });
                    }

                    if (_options.editOptions.editing.cancelButton.visible) {
                        var $cancelButton = $(_template.buttons.roundButton.format(_options.editOptions.editing.cancelButton.caption || actionType.cancel));
                        $editActionBar.find("td").append($cancelButton);
                        $cancelButton.click(function () {
                            gridView.edit.cancelEdit($el);
                        });
                    }

                    $el.after($editActionBar);
                },
                update: function ($row, updateData, rowId) {
                    var me = this;

                    $.each(_options.columns, function (index, column) {
                        var value;
                        if ((column.visible == undefined || column.visible) && column.editor) {
                            var $cell = $row.find('td[data-name={0}]'.format(column.name));

                            switch (column.editor.type) {
                                case editorType.lookup:
                                    if (column.editor.lookup.LookupView.code()) $cell.html(column.editor.lookup.LookupView.value());
                                    else $cell.html('');
                                    break;
                                case editorType.checkBox:
                                    $cell.html(_template.cellTemplate.checkBox.format(updateData[column.name] ? 'checked' : ''));
                                    break;

                                case editorType.textarea:
                                    $cell.html(updateData[column.name]);
                                    break;

                                case editorType.select:
                                case editorType.radio:
                                    if (column.selectOptions) {
                                        if (updateData[column.name]) {
                                            $.each(column.selectOptions, function (index, option) {
                                                if (option.value == updateData[column.name]) {
                                                    $cell.html(option.text);
                                                    return false;
                                                }
                                            });
                                        }
                                        else {
                                            $cell.html('');
                                        }
                                    }
                                    break;

                                case editorType.date:
                                    $cell.html(updateData[column.name].format(column.displayFormat));
                                    break;

                                default:
                                    value = updateData[column.name];
                                    if (column.displayType === displayType.link) {
                                        for (var key in updateData) {
                                            column.link = column.link.replaceAll("{{{0}}}".format(key), updateData[key]);
                                        }
                                        value = _template.cellTemplate.link.format(column.link, column.target || '_blank', value)
                                    }
                                    $cell.html(value);
                                    
                                    break;
                            }
                        }
                    });
                    $row.next().remove();

                    if ($row.data('isNew')) {
                        //var insertedRecord = provider.insertedRecords.filter(x => x.rowId === rowId);
                        var insertedRecord = $.grep(provider.insertedRecords, function (x) { return x.rowId === rowId; });
                        if (insertedRecord.length === 0) {
                            provider.data.push(updateData);
                            updateData.IsNew = true;
                            provider.insertedRecords.push(updateData);
                        }
                    }
                    else {
                        //var updatedRecord = provider.updatedRecords.filter(x => x[_options.keyField] === updateData[_options.keyField]);
                        var updatedRecord = $.grep(provider.updatedRecords, function (x) { return x[_options.keyField] === updateData[_options.keyField]; });

                        if (updatedRecord.length === 0) {
                            updateData.IsUpdate = true;
                            provider.updatedRecords.push(updateData);
                        }
                    }
                    if (!_options.editOptions.actionMode === actionMode.remote) updateData.isDirty = true;
                    me.$editingRow = null;

                    return true;
                },
                cancel: function ($el, data) {
                    var me = this;
                    $.each(_options.columns, function (index, column) {
                        if (column.visible == undefined || column.visible) {
                            var $cell = $el.find('td[data-name={0}]'.format(column.name));

                            var value = data[column.name];

                            if (column.selectOptions) {
                                $.each(column.selectOptions, function (index, option) {
                                    if (option.value === value) {
                                        value = option.text;
                                        return false;
                                    }
                                });
                            }
                            switch (column.displayType) {
                                case displayType.datetime: if (value) value = (new Date(value)).format(column.displayFormat); break;
                                case displayType.checkBox: value = _template.cellTemplate.checkBox.format(value ? 'checked' : ''); break;
                                case displayType.link:
                                    for (var key in data) {
                                        column.link = column.link.replaceAll("{{{0}}}".format(key), data[key]);
                                    }

                                    value = _template.cellTemplate.link.format(column.link, column.target || '_blank', value);
                                    break;
                            }

                            $cell.html(value || '');
                        }
                    });
                    me.$editingRow = null;

                }
            },
            popup: {
                $root: null,
                update: function ($el, data, updateData, rowId) {
                    var me = this;
                    data = $.extend(data, updateData);
                    $.each(_options.columns, function (index, column) {
                        if (column.visible == undefined || column.visible) {
                            var $cell = $el.find('td[data-name={0}]'.format(column.name));
                            var value = data[column.name] || column.defaultValue || '';

                            if (column.selectOptions) {
                                if (value) {
                                    $.each(column.selectOptions, function (index, option) {
                                        if (option.value === value) {
                                            $cell.html(option.text);
                                            return false;
                                        }
                                    });
                                }
                                else {
                                    data[column.name] = '';
                                    $cell.html('');
                                }
                            }
                            else {
                                if (column.dataType === dataType.bool) {
                                    $cell.html(_template.cellTemplate.checkBox.format(value ? 'checked' : ''));
                                }
                                else {
                                    $cell.html(value);
                                }
                            }
                        }
                    });

                    if (data[_options.keyField]) {
                        //var updatedRecord = provider.updatedRecords.filter(x => x[_options.keyField] === data[_options.keyField]);
                        var updatedRecord = $.grep(provider.updatedRecords, function (x) { return x[_options.keyField] === updateData[_options.keyField]; });
                        if (updatedRecord.length === 0) {
                            data.IsUpdate = true;
                            provider.updatedRecords.push(data);
                        }
                    }
                    else {
                        //var insertedRecord = provider.insertedRecords.filter(x => x.rowId === rowId);
                        var insertedRecord = $.grep(provider.insertedRecords, function (x) { return x.rowId === rowId; });
                        if (insertedRecord.length === 0) {
                            provider.data.push(data);
                            data.IsNew = true;
                            provider.insertedRecords.push(data);
                        }
                    }
                    data.isDirty = true;
                    return true;
                },
                setData: function (data) {
                    var me = this;
                    zsmcJs.lib.mapper.bindDataByName(me.$root.find(".modal-body"), data);
                    $.each(_options.editOptions.editing.popupView.details, function (detailIndex, detail) {
                        switch (detail.viewType) {
                            case "grid":
                                _details[detail.entity].Provider.bindData(data[detail.entity]);
                                break;
                            case "form":
                                _details[detail.entity].Provider.bindData(data[detail.entity]);
                                break;
                        }
                    });
                }
            },
            isValid: function ($el) {
                var valid = true;
                $.each(_options.columns, function (index, column) {
                    var $cell = $el.find('td[data-name={0}]'.format(column.name));
                    var value = $cell.find("input[name='{0}']".format(column.name)).val();

                    $cell.find("input[name='{0}']".format(column.name)).removeClass("zsmc-editor-invalid");
                    if (column.editor && column.editor.mandatory && !$.trim(value)) {
                        $cell.find("input[name='{0}']".format(column.name)).addClass("zsmc-editor-invalid");
                        $cell.find("input[name='{0}']".format(column.name)).attr("title", column.editor.inValidText || "This field is required.");
                        valid = false;
                    }
                });

                return valid;
            },
            commit: function () {
                $.each(provider.data, function (index, d) {
                    d.isDirty = false;
                });
                provider.originData = provider.data;
            },
            rollback: function () {
                $.each(provider.originData, function (index, d) {
                    d.isDirty = false;
                });
                provider.data = provider.originData;
            }
        },
        paging: {
            mode: '',
            actionUrl: '',
            param: {},
            currentPage: 1,
            blockSize: 5,
            startPageNumber: 1,
            totalPageCount: 0,
            isPagingAction: false,
            load: function () {
                var me = this;
                me.mode = _options.viewOptions.actionMode || actionMode.local;
                me.blockSize = _options.viewOptions.paging.blockSize || 5;
            },
            setHistory: function () {
                var me = this;
                if (!me.isPagingAction) {
                    history.pushState({ page: 1, instance: instance }, "page1", Location.href);
                    me.isPagingAction = true;
                }
                history.pushState({ page: me.currentPage, instance: instance }, "page" + me.currentPage, Location.href);
            },
            drawFirstPage: function () {
                var me = this;
                me.currentPage = 1;
                if (me.mode === actionMode.remote) {
                    me.pagingAjax(me.currentPage, 1);
                }
                else {
                    me.totalPageCount = Math.ceil(provider.data.length / _options.viewOptions.paging.rowCount);
                    gridView.drawData(provider.data.slice(0, _options.viewOptions.paging.rowCount));
                    me.drawPager(me.currentPage, false);
                }
            },
            drawSpecifyPage: function (page, ignoreHistory) {
                var me = this;
                me.currentPage = page;

                //gridView.events.onBeforePaging(page);
                if (me.mode === actionMode.remote) { 
                    me.pagingAjax(me.currentPage, me.startPageNumber);
                }
                else {
                    var tableData = provider.data.slice((me.currentPage - 1) * _options.viewOptions.paging.rowCount,
                        ((me.currentPage - 1) * _options.viewOptions.paging.rowCount) + _options.viewOptions.paging.rowCount);
                    gridView.drawData(tableData);
                    me.drawPager(me.currentPage, !ignoreHistory);
                    //gridView.events.onAfterPaging(page);
                }
            },
            drawLastPage: function () {
                var me = this;
                me.currentPage = Math.ceil(provider.data.length / _options.viewOptions.paging.rowCount);

                if (me.mode === actionMode.remote) {
                    me.pagingAjax(me.currentPage, me.currentPage - me.blockSize + 1);
                }
                else {
                    gridView.drawData(provider.data.slice((me.currentPage - 1) * _options.viewOptions.paging.rowCount, ((me.currentPage - 1) * _options.viewOptions.paging.rowCount) + _options.viewOptions.paging.rowCount));
                    me.drawPager(me.currentPage - me.blockSize + 1, true);
                }
            },
            drawPrevPage: function (page) {
                var me = this;
                me.currentPage = page;

                gridView.events.onBeforePaging(page);
                if (me.mode === actionMode.remote) {
                    me.pagingAjax(me.currentPage, page - (me.blockSize - 1));
                }
                else {
                    var tableData = provider.data.slice((me.currentPage - 1) * _options.viewOptions.paging.rowCount,
                        ((me.currentPage - 1) * _options.viewOptions.paging.rowCount) + _options.viewOptions.paging.rowCount);
                    gridView.drawData(tableData);
                    me.drawPager(me.currentPage, true);
                    gridView.events.onAfterPaging(page);
                }
            },
            drawNextPage: function (page) {
                var me = this;
                me.currentPage = page;

                gridView.events.onBeforePaging(page);
                if (me.mode === actionMode.remote) {
                    me.pagingAjax(me.currentPage, page);
                }
                else {
                    var tableData = provider.data.slice((me.currentPage - 1) * _options.viewOptions.paging.rowCount,
                        ((me.currentPage - 1) * _options.viewOptions.paging.rowCount) + _options.viewOptions.paging.rowCount);
                    gridView.drawData(tableData);
                    me.drawPager(me.currentPage, true);
                    gridView.events.onAfterPaging(page);
                }
            },
            drawPagerOld: function (startPageNumber) {
                var me = this;
                _$tableContainer.find(".pagination ul").html('');

                me.startPageNumber = startPageNumber;
                var block = 1;
                if (startPageNumber > 1) {
                    var $nextPageButton = $(_template.paging.linkPage.format("<"));
                    _$tableContainer.find(".pagination ul").append($nextPageButton);
                    $nextPageButton.click(function (e) { me.drawPrevPage(startPageNumber - 1); });
                }

                for (var i = startPageNumber; i <= me.totalPageCount; i++) {
                    if (block > me.blockSize) {
                        var $nextPageButton = $(_template.paging.linkPage.format(">"));
                        _$tableContainer.find(".pagination ul").append($nextPageButton);
                        $nextPageButton.click(function (e) { me.drawNextPage(i); });
                        break;
                    }
                    else {
                        if (i === me.currentPage) {
                            _$tableContainer.find(".pagination ul").append(_template.paging.currentPage.format(i));
                        }
                        else {
                            var $pageButton = $(_template.paging.linkPage.format(i));
                            _$tableContainer.find(".pagination ul").append($pageButton);
                            $pageButton.click(function (e) {
                                var pageNumber = $(e.target).data("page");
                                gridView.events.onBeforePaging(pageNumber);
                                me.drawSpecifyPage(pageNumber);
                                gridView.events.onAfterPaging(pageNumber);
                            });
                        }
                    }
                    block++;
                }
            },
            drawPager: function (currentPage, useHistory) {
                var me = this;
                me.currentPage = currentPage;
                
                if (_$tableContainer.find(".pagination ul").length == 0) {
                    _$tableContainer.append(_template.paging.pagingBox);
                }


                _$tableContainer.find(".pagination ul").html('');
                me.startPageNumber = currentPage - Math.floor(me.blockSize / 2) > 0 ? currentPage - Math.floor(me.blockSize / 2) + (me.blockSize % 2 == 0 ? 1 : 0) : 1;

                if (me.totalPageCount - me.startPageNumber < me.blockSize && me.totalPageCount < me.startPageNumber + me.blockSize - 1) {
                    me.startPageNumber = me.totalPageCount - me.blockSize + 1;

                    if (me.startPageNumber === 0) me.startPageNumber = 1;
                }

                var block = 1;
                if (currentPage > 1) {
                    var $prevPageButton = $(_template.paging.linkPage.format("<"));
                    _$tableContainer.find(".pagination ul").append($prevPageButton);
                    $prevPageButton.click(function (e) { me.drawPrevPage(currentPage - 1); });
                }
                for (var i = me.startPageNumber; i <= me.totalPageCount; i++) {
                    if (block > me.blockSize) {
                        break;
                    }
                    else {
                        if (i === me.currentPage) {
                            _$tableContainer.find(".pagination ul").append(_template.paging.currentPage.format(i));
                        }
                        else {
                            var $pageButton = $(_template.paging.linkPage.format(i));
                            _$tableContainer.find(".pagination ul").append($pageButton);
                            $pageButton.click(function (e) {
                                var pageNumber = $(e.target).data("page");
                                gridView.events.onBeforePaging(pageNumber);
                                me.drawSpecifyPage(pageNumber);
                                if (me.mode !== actionMode.remote) gridView.events.onAfterPaging(pageNumber);
                            });
                        }
                    }
                    block++;
                }
                if (currentPage < me.totalPageCount) {
                    var $nextPageButton = $(_template.paging.linkPage.format(">"));
                    _$tableContainer.find(".pagination ul").append($nextPageButton);
                    $nextPageButton.click(function (e) {
                        me.drawNextPage(currentPage + 1);
                    });
                }

                if (useHistory && _options.viewOptions.paging.keepHistory) {
                    me.setHistory();
                }
            },
            pagingAjax: function (page) {
                var me = this;
                var sorting = gridView.sorting;
                _loadParameter.pageNumber = page;
                _loadParameter.rowCount = _options.viewOptions.paging.rowCount || 20;
                gridView.loadAjax();
            }
        },
        sorting: {
            lastAction: {
                column: '',
                dataType: '',
                direction: ''
            },
            drawSorting: function ($headerCell, column) {
                $headerCell.addClass("point");
                $headerCell.click(function () {
                    var isDescending = $headerCell.hasClass("up");
                    $headerCell.closest("tr").find("th").removeClass("up");
                    $headerCell.closest("tr").find("th").removeClass("down");
                    if (_options.viewOptions.actionMode == actionMode.remote) {
                        if (isDescending) {
                            $headerCell.addClass("down");
                            gridView.events.onBeforeSorting(column.name, "asc");
                            gridView.sorting.sortingAjax(column.name, column.dataType, "asc");
                        }
                        else {
                            $headerCell.addClass("up");
                            gridView.events.onBeforeSorting(column.name, "desc");
                            gridView.sorting.sortingAjax(column.name, column.dataType, "desc");
                        }
                    }
                    else {
                        if (isDescending) {
                            $headerCell.addClass("down");
                            gridView.events.onBeforeSorting(column.name, "asc");
                            provider.data = provider.data.sort(function (a, b) {
                                if (column.dataType == dataType.number) {
                                    return a[column.name] - b[column.name];
                                }
                                else {
                                    if (a[column.name] < b[column.name]) {
                                        return 1;
                                    }
                                    if (a[column.name] > b[column.name]) {
                                        return -1;
                                    }
                                    return 0;
                                }
                            });
                            gridView.paging.drawSpecifyPage(gridView.paging.currentPage);
                            gridView.events.onAfterSorting(column.name, "asc");
                        }
                        else {
                            $headerCell.addClass("up");
                            gridView.events.onBeforeSorting(column.name, "desc");
                            provider.data = provider.data.sort(function (a, b) {
                                if (column.dataType == dataType.number) {
                                    return b[column.name] - a[column.name];
                                }
                                else {
                                    if (a[column.name] < b[column.name]) {
                                        return -1;
                                    }
                                    if (a[column.name] > b[column.name]) {
                                        return 1;
                                    }
                                    return 0;
                                }
                            });
                            gridView.paging.drawSpecifyPage(gridView.paging.currentPage);
                            gridView.events.onAfterSorting(column.name, "desc");
                        }
                    }
                });
            },
            sortingAjax: function (column, dataType, direction) {
                var me = this;

                _loadParameter.sortingColumn = column;
                _loadParameter.sortingDataType = dataType || "";
                _loadParameter.direction = direction
                gridView.loadAjax();
            }
        },
        events: {
            onBeforeLoadDetails: function (type, entityName, data) { if (_options.events.onBeforeLoadDetails) return _options.events.onBeforeLoadDetails.call(this, type, entityName, data); },
            onBeforeOpenPopup: function (data) { if (_options.events.onBeforeOpenPopup) return _options.events.onBeforeOpenPopup.call(this, data); },
            onAfterOpenPopup: function () { if (_options.events.onAfterOpenPopup) return _options.events.onAfterOpenPopup.call(this); },
            onBeforeLoadData: function () { if (_options.events.onBeforeLoadData) return _options.events.onBeforeLoadData.call(this); },
            onLoadedData: function (data) { if (_options.events.onLoadedData) return _options.events.onLoadedData.call(this, data); },
            onRowUpdating: function (data, rowId) { if (_options.events.onRowUpdating) return _options.events.onRowUpdating.call(this, data, rowId); },
            onRowUpdated: function (data, rowId) { if (_options.events.onRowUpdated) return _options.events.onRowUpdated.call(this, data, rowId); },
            onRowDeleting: function (data, rowId) { if (_options.events.onRowDeleting) return _options.events.onRowDeleting.call(this, data, rowId); },
            onRowDeleted: function (data, rowId) { if (_options.events.onRowDeleted) return _options.events.onRowDeleted.call(this, data, rowId); },
            onRowClicked: function (data, rowId) { if (_options.events.onRowClicked) return _options.events.onRowClicked.call(this, data, rowId); },
            onRowDblClicked: function (data, rowId) { if (_options.events.onRowDblClicked) return _options.events.onRowDblClicked.call(this, data, rowId); },
            onRowEnterKeyDown: function (data, rowId) { if (_options.events.onRowEnterKeyDown) return _options.events.onRowEnterKeyDown.call(this, data, rowId); },
            onEditorLoaded: function ($el, data, rowId) { if (_options.events.onEditorLoaded) { return _options.events.onEditorLoaded.call(this, $el, data, rowId); } },
            onBeforeSorting: function (header, rowId) { if (_options.events.onBeforeSorting) { return _options.events.onBeforeSorting.call(this, header, rowId); } },
            onAfterSorting: function (header, rowId) { if (_options.events.onAfterSorting) { return _options.events.onAfterSorting.call(this, header, rowId); } },
            onBeforePaging: function (header, rowId) { if (_options.events.onBeforePaging) { return _options.events.onBeforePaging.call(this, pageNumber); } },
            onAfterPaging: function (header, rowId) { if (_options.events.onAfterPaging) { return _options.events.onAfterPaging.call(this, pageNumber); } },

        }
    };

    var provider = {
        originData: [],
        data: [],
        selectedRow: {},
        insertedRecords: [],
        updatedRecords: [],
        deletedRecords: [],
        bindData: function (data) {
            var me = this;
            me.insertedRecords = [];
            me.updatedRecords = [];
            me.deletedRecords = [];

            if (_options.viewOptions.paging.visible) {
                gridView.paging.load();
                if (_options.viewOptions.actionMode == actionMode.remote) {
                    me.originData = me.data = data.list;
                    var paging = gridView.paging;
                    paging.totalPageCount = Math.ceil(data.totalCount / _options.viewOptions.paging.rowCount);
                    paging.drawPager(paging.currentPage);
                    gridView.drawData(data.list);
                }
                else {
                    me.originData = me.data = data;
                    gridView.paging.drawFirstPage();
                }
            }
            else {
                me.originData = me.data = data;
                gridView.drawData(data);
            }
        },
        bindPagingData: function (data) {
            var me = this;
            me.originData = me.data = data;
            gridView.drawData(data);
        },
        getJsonByRowId: function (rowId) {
            var me = this;
            var json = {};
            $.each(me.data, function (index, d) {
                if (d.rowId === rowId) {
                    json = d;
                    return false;
                }
            });

            return json;
        },
        getIndexByRowId: function (rowId) {
            var me = this;
            var rowIndex = -1;
            $.each(me.data, function (index, d) {
                if (d.rowId === rowId) {
                    rowIndex = index;
                    return false;
                }
            });

            return rowIndex;
        },
        getInsertedRecords: function () {
            var me = this;
            return me.insertedRecords;
        },
        getUpdatedRecords: function () {
            var me = this;
            return me.updatedRecords;
        },
        getDeletedRecords: function () {
            var me = this;
            return me.deletedRecords;
        },
        getChangedRecords: function () {
            var me = this;

            var records = [];

            records.push.apply(records, me.insertedRecords);
            records.push.apply(records, me.updatedRecords);
            records.push.apply(records, me.deletedRecords);

            return records;
        },
        getVisibleColumns: function () {
            var columns = [];

            $.each(_options.columns, function (index, column) {
                if (column.visible === undefined || column.visible) {
                    columns.push(column);
                }
            });

            return columns;
        },
        getSelectedRow: function () {
            var me = this;
            me.selectedRow;
        },
        removeByRowId: function (rowId) {
            var me = this;
            var index = me.getIndexByRowId(rowId);

            if (index > -1) me.data.splice(index, 1);
        }
    };

    //api
    return {
        GridView: gridView,
        Provider: provider,
        Events: gridView.events
    };
});

