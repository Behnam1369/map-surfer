type City = string;
type Street = string;

export default interface IGetAddressResponse {
  address: [City, Street]
}