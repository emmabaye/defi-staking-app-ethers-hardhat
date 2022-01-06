pragma solidity ^0.5.0;

contract Tether {
    string public name = 'MockTether';
    string public symbol = 'mUSDT';
    uint256 public totalSupply = 8000000 * 1000000000000000000;//1 million tokens
    uint8 public decimals = 18;

    event Transfer(
        address _from,
        address _to,
        uint _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint _value
    );

    mapping(address => uint256) public balanceOf;
    mapping(address =>  mapping(address => uint256)) public allowance;

    constructor() public {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) public  {
        // allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
    }

    function transferFrom(address _from, address _to, uint256 _value) public payable returns(bool success) {
        require(_value <= balanceOf[_from], 'Insufficient balance');
        // require(_value <= allowance[_from][msg.sender], 'allowance error');
        balanceOf[_to] += _value;
        balanceOf[_from] -= _value;
        // allowance[msg.sender][_from] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
}