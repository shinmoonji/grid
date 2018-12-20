zsmcJs.grid = zsmcJs.grid || {}

zsmcJs.grid._template = {
    table: {
        container: "<div class='zsmc-grid'></div>",
        root: "<table></table>",
        header: "<thead><tr class='zsmc-grid-labels'></tr></thead>",
        headerItem: "<th style='width:{0}px' data-name='{1}'>{2}</th>",
        body: "<tbody></tbody>",
        footer: "<tfoot><tr class='zsmc-grid-labels'></tr></tfoot>",
        row: "<tr class='{0}' data-id='{1}' tabindex='{2}'></tr>",
        cell: "<td style='text-align:{0}' data-name='{1}'>{2}</td>"
    },
    resizeColumnTemplate: "<span class='zsmc-grid-resize' style='cursor: col-resize'>&nbsp;</span>",
    cellTemplate: {
        checkBox: "<label><input type='checkbox' class='zsmc' {0} /><span class='lbl' /></span>"
    },
    editors: {
        textBox: "<input class='input-sm form-control' type='text' name='{0}' style='text-align:{1};' />",
        datePicker: "<input type='text' name='{0}' class='input-date input-sm text-center form-control' value='{1}' />",
        selectBox: "<select class='input-sm form-control' name='{0}' style='text-align:{1};' />",
        radio: "<label> \
                        <input type='radio' name='{0}' class='zsmc' value='{1}' /> \
                        <span class='lbl'> {2}</span> \
                    </label>",
        checkBox: "<label><input type='checkbox' class='zsmc' name='{0}' /><span class='lbl'></span></label>",
        selectOption: "<option value='{0}'>{1}</option>",
        lookup: "<div></div>",
        textarea: "<textarea  name='{0}' rows='2'></textarea>"
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
        pagingBox: "<div class='zsmc-grid-pager'> \
                <div style='text-align:left' class='col-xs-3'> \
                </div> \
                    <div style='text-align:center' class='col-xs-6'> \
                        <span class='ui-icon fa fa-angle-double-left zsmc-bigger-140'></span> \
                        <span class='ui-icon fa fa-angle-left bigger-140 zsmc-bigger-140'></span> \
                        <span class='ui-separator'></span> \
                        <span class='zsmc-page-info'>1 of 3</span> \
                        <span class='ui-separator'></span> \
                        <span class='ui-icon ace-icon fa fa-angle-right zsmc-bigger-140'></span> \
                        <span class='ui-icon ace-icon fa fa-angle-double-right zsmc-bigger-140'></span> \
                    </div> \
                    <div style='text-align:right; vertical-align:middle' class='col-xs-3'> \
                        <span class='zsmc-page-rowcount' style='padding-top:35px'>View 1 - 10 of 10</span> \
                    </div> \
                </div>"
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
}