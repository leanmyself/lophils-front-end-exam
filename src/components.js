export function ModalhandleShow(id) {
    const updatedListItems = [...this.state.listitems];
    updatedListItems.find((item) => item.id === id).contentModalDisplayed = true;
    this.setState({ listitems: updatedListItems });
};

export function ModalhandleClose(id) {
    const updatedListItems = [...this.state.listitems];
    updatedListItems.find((item) => item.id === id).contentModalDisplayed = false;
    this.setState({ listitems: updatedListItems });
};

export function handleCheckboxChange(id) {
    const updatedListItems = [...this.state.listitems];
    updatedListItems.find((item) => item.id === id).checked = !updatedListItems.find((item) => item.id === id).checked;
    const checkallCheckbox = updatedListItems.every((item) => item.checked);
    this.setState({ listitems: updatedListItems, checkAll: checkallCheckbox });
};

export function handleCheckAllCheckbox() {
    const updatedListItems = [...this.state.listitems];
    updatedListItems.forEach((item) => (item.checked = !this.state.checkAll));
    this.setState({ listitems: updatedListItems, checkAll: !this.state.checkAll });
};

export function handleDeleteData() {
    const updatedListItems = this.state.listitems.filter(
        (item) => !item.checked);
    this.setState({ listitems: updatedListItems });
};

export function handlePageChange(pageNumber)  {
    this.setState({
        currentPage: pageNumber
    });
}
