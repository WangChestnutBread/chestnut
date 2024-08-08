import Dropdown from 'react-bootstrap/Dropdown';

function BlackBoardTabDropDown({chapterTitle}) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {
            chapterTitle.map((item)=>{
                return (
                    <Dropdown.Item>{`Ch.${item.chapterId}`}</Dropdown.Item>
                )
            })
        }
        
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default BlackBoardTabDropDown;