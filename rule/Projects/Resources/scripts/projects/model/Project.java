package projects.model;

import com.exponentus.common.model.Attachment;
import com.exponentus.dataengine.jpa.SecureAppEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import projects.model.constants.ProjectStatusType;
import staff.model.Organization;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "projects")
@NamedQuery(name = "Project.findAll", query = "SELECT m FROM Project AS m ORDER BY m.regDate")
public class Project extends SecureAppEntity<UUID> {

    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = true, length = 10)
    private ProjectStatusType status = ProjectStatusType.UNKNOWN;

    private Organization customer;

    @JsonProperty("managerUserId")
    private long manager;

    @JsonProperty("programmerUserId")
    private long programmer;

    @JsonProperty("testerUserId")
    private long tester;

    @JsonProperty("observerUserIds")
    private List<Long> observers;

    private Date finishDate;

    private String comment;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinTable(name = "project_attachments", joinColumns = {@JoinColumn(name = "parent_id", referencedColumnName = "id")}, inverseJoinColumns = {
            @JoinColumn(name = "attachment_id", referencedColumnName = "id")})
    private List<Attachment> attachments;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ProjectStatusType getStatus() {
        return status;
    }

    public void setStatus(ProjectStatusType status) {
        this.status = status;
    }

    @JsonIgnore
    public Organization getCustomer() {
        return customer;
    }

    public void setCustomer(Organization customer) {
        this.customer = customer;
    }

    public long getManager() {
        return manager;
    }

    public void setManager(long manager) {
        this.manager = manager;
    }

    public long getProgrammer() {
        return programmer;
    }

    public void setProgrammer(long programmer) {
        this.programmer = programmer;
    }

    public long getTester() {
        return tester;
    }

    public void setTester(long tester) {
        this.tester = tester;
    }

    public List<Long> getObservers() {
        return observers;
    }

    public void setObservers(List<Long> observers) {
        this.observers = observers;
    }

    public Date getFinishDate() {
        return finishDate;
    }

    public void setFinishDate(Date finishDate) {
        this.finishDate = finishDate;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public List<Attachment> getAttachments() {
        return attachments;
    }

    public void setAttachments(List<Attachment> attachments) {
        this.attachments = attachments;
    }

    public String getCustomerId() {
        return customer != null ? customer.getIdentifier() : "";
    }
}
