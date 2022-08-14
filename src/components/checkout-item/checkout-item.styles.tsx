import styled from "styled-components";

export const CheckoutContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;
`

export const ImageContainer = styled.div`
  width: 23%;
  padding-right: 15px;
`
export const CheckoutImage = styled.img`
  width: 100%;
  height: 100%;
`
export const CheckoutDefault = styled.span`
  width: 23%;
  display: flex;
  align-items: center;
  padding-left: 11px;
  @media screen and (max-width: 800px){
    padding-left: 5px;
  }
`

export const QuantitySpan = styled(CheckoutDefault)`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ArrowDiv = styled.div`
  cursor: pointer;
`

export const ValueSpan = styled.span`
  margin: 3px 10px 0 10px;
`

export const RemoveButton = styled.div`
  padding-left: 12px;
  cursor: pointer;
`