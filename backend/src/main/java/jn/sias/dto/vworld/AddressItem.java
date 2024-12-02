package jn.sias.dto.vworld;

public class AddressItem extends Item {

    public Address address;

    @Override
    public String removePrefix(String prefix) {

        String tempString = address.road.replace(prefix, "").trim();
        return tempString.split(" ")[0];
    }

    public String getRoad() {
        return address.road;
    }

}
