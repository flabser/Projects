package workflow.model.constants;

/**
 * 
 * @author Kayra created 07-04-2016
 */
public enum DecisionType {
	UNKNOWN(0), YES(12), NO(13);

	private int code;

	DecisionType(int code) {
		this.code = code;
	}

	public int getCode() {
		return code;
	}

	public static DecisionType getType(int code) {
		for (DecisionType type : values()) {
			if (type.code == code) {
				return type;
			}
		}
		return UNKNOWN;
	}

}
