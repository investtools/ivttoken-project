import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import { Layout, Button, Input, List } from "antd"
import { configureStore } from "@reduxjs/toolkit"
import { Provider, useDispatch, useSelector } from "react-redux"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import Web3 from "web3"
import { ABI } from "./abi.js"
import { config } from "dotenv"
config()

const { Header, Content } = Layout
const web3 = new Web3(Web3.givenProvider)
const contractAddress = process.env.CONTRACT_ADDRESS
const contract = new web3.eth.Contract(ABI, contractAddress)

const fetchBalance = createAsyncThunk("balance/fetchBalance", async (address) => {
  const balance = await contract.methods.balanceOf(address).call()
  return balance
})

const fetchTransactions = createAsyncThunk("transactions/fetchTransactions", async (address) => {
  const apiKey = "apikey"
  const url = `https://api.etherscan.io/api?module=account&action=tokentx&address=${address}&contractaddress=${contractAddress}&apikey=${apiKey}`
  const response = await axios.get(url)
  return response.data.result
})

const balanceSlice = createSlice({
  name: "balance",
  initialState: { value: 0 },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBalance.fulfilled, (state, action) => {
      state.value = action.payload
    })
  },
})

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: { value: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTransactions.fulfilled,
(state, action) => {
      state.value = action.payload
    })
  },
})

const store = configureStore({ reducer: { balance: balanceSlice.reducer, transactions: transactionsSlice.reducer } })

const App = () => {
  const [account, setAccount] = useState("")
  const [recipient, setRecipient] = useState("")
  const [amount, setAmount] = useState("")
  const dispatch = useDispatch()
  const balance = useSelector((state) => state.balance.value)
  const transactions = useSelector((state) => state.transactions.value)

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        setAccount(accounts[0])
      })
    }
  }, [])

  const connect = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
      setAccount(accounts[0])
      dispatch(fetchBalance(accounts[0]))
      dispatch(fetchTransactions(accounts[0]))
    }
  }

  const transfer = async () => {
    if (account && recipient && amount) {
      const gas = await contract.methods.transfer(recipient, amount).estimateGas({ from: account })
      await contract.methods.transfer(recipient, amount).send({ from: account, gas })
      dispatch(fetchBalance(account))
      dispatch(fetchTransactions(account))
    }
  }

  return (
    <Layout>
      <Header>
        <Button onClick={connect}>Connect</Button>
      </Header>
      <Content>
        <div>Account: {account}</div>
        <div>Balance: {balance}</div>
        <Input placeholder="Recipient address" onChange={(e) => setRecipient(e.target.value)} />
        <Input placeholder="Amount" onChange={(e) => setAmount(e.target.value)} />
       
<Button onClick={transfer}>Transfer</Button>
        <div>
          <h2>Transaction History</h2>
          <List
            dataSource={transactions}
            renderItem={(transaction) => (
              <List.Item key={transaction.hash}>
                <div>
                  <div>Hash: {transaction.hash}</div>
                  <div>From: {transaction.from}</div>
                  <div>To: {transaction.to}</div>
                  <div>Value: {web3.utils.fromWei(transaction.value, "ether")}</div>
                  <div>TimeStamp: {new Date(transaction.timeStamp * 1000).toLocaleString()}</div>
                </div>
              </List.Item>
            )}
          />
        </div>
      </Content>
    </Layout>
  )
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)